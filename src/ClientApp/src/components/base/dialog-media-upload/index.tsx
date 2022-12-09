import {LoadingButton} from '@mui/lab';
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {Grid8, HambergerMenu} from 'iconsax-react';
import moment from 'moment';
import {useSnackbar} from 'notistack';
import React, {FC, useRef, useState} from 'react';
import FileUpload from 'react-material-file-upload';
import {uploadApi} from 'src/apis';
import {FileItem, FileParams} from 'src/models';
import {useAppSelector} from '../../../redux/hooks';
import {selectAuth} from '../../../redux/slice/auth';
import IconButtonBase from '../icon-button-base';
import SearchBar from '../search-bar';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props extends Omit<DialogProps, 'onSubmit'> {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode[] | React.ReactNode;
  onSubmit?: (data: string[]) => void;
  multiple?: boolean;
  init?: string | undefined;
}
let listImage = [];
const DialogMediaUpload: FC<Props> = ({
  open,
  onClose,
  onSubmit,
  children,
  multiple = false,
  init,
  ...rest
}) => {
  const {email} = useAppSelector(selectAuth);

  const [listChecked, setListChecked] = useState<string[]>(init ? [init] : []);
  const {enqueueSnackbar} = useSnackbar();
  const [files, setFiles] = useState<File[]>([]);
  const [isUpload, setIsUpload] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState('');
  const listImageRef = useRef<FileItem[]>();
  const [filterFiles, setFilterFiles] = useState<FileParams>({
    bucket: 'cars',
    page: 1,
    limit: 99999999999,
    search: '',
    fileType: 'image',
  });
  const [listFileImage, setListFileImage] = useState<FileItem[]>([]);
  // const [progress, setProgress] = useState(0);
  const [view, setView] = useState('list');
  const [pagination, setPagination] = useState({
    page: 1,
    totalCount: 1,
    totalPage: 1,
    limit: 10,
    total: 1,
  });

  const handleSubmit = async () => {
    if (isUpload) {
      setIsSubmitting(true);
      const formData = new FormData();

      files.forEach(item => {
        formData.append('files', item);
      });
      formData.append('bucket', 'cars');
      formData.append('permission', 'public');
      formData.append('owner', email ?? '');
      try {
        const res = await uploadApi.uploadFiles(formData);
        if (res) {
          setFiles([]);
          enqueueSnackbar('Upload thành công', {variant: 'success'});
          setIsUpload(false);
          setListFileImage([]);
          setFilterFiles(prev => ({...prev, page: 1}));
        } else {
          enqueueSnackbar('Đã xảy ra lỗi upload', {variant: 'error'});
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }

      setIsSubmitting(false);
    } else {
      // console.log(listImage, listChecked);
      onSubmit && onSubmit(listChecked);
    }
    // console.log(files);
  };
  // const handleLoadMore = async () => {
  //   setFilterFiles(prev => ({...prev, page: (prev?.page ?? 0) + 1}));
  // };
  const handleLoadMore = async () => {
    setListFileImage(
      listImageRef.current
        ?.filter((item, index) => item.name.toLowerCase().includes(search.toLowerCase()))
        .filter((item, index) => index < pagination.limit * pagination.page + 1) ?? []
    );

    setPagination(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  };
  const handleSearch = (value: string) => {
    // setFilterFiles(prev => ({...prev, search: value}));
    // setListFileImage([]);
    setSearch(value);
    const newList =
      listImageRef.current?.filter(item => item.name.toLowerCase().includes(value.toLowerCase())) ??
      [];
    setListFileImage(
      newList.filter((item, index) => index < pagination.limit * pagination.page) ?? []
    );
    setPagination(prev => ({
      ...prev,
      totalCount: newList.length,
      totalPage: Math.ceil(newList.length / prev.limit),
    }));
  };
  React.useEffect(() => {
    init && setListChecked([init]);
  }, [init]);
  React.useEffect(() => {
    const getAllImage = async () => {
      try {
        setIsFetching(true);
        const res = await uploadApi.getAll(filterFiles);

        const data = res.data.map(item => {
          const arrName = item.Key.split('/');
          return {...item, name: arrName[arrName.length - 1]};
        });
        listImageRef.current = data;
        setListFileImage(data.filter((item, index) => index < pagination.limit * pagination.page));
        setPagination(prev => ({
          ...prev,
          ...res.pagination,
          limit: prev.limit,
          totalPage: Math.ceil(res.pagination.total / prev.limit),
        }));
      } catch (error) {
        console.log('Lỗi get list image', error);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    };

    !isUpload && getAllImage();
  }, [isUpload]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth
      maxWidth="md"
      {...rest}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <DialogTitle
        sx={{fontSize: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
      >
        Upload
        <Button onClick={() => setIsUpload(prev => !prev)}>
          {isUpload ? 'Chọn hình ảnh' : 'Upload hình ảnh'}
        </Button>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {isLoading ? (
          <Stack direction="row" justifyContent="center">
            <CircularProgress />
          </Stack>
        ) : isUpload ? (
          <>
            <FileUpload value={files} onChange={setFiles} multiple />
            {/* <div className="py-4">
              <Typography
                className="flex justify-center"
                variant="caption"
              >{`${progress}%`}</Typography>
              <LinearProgress variant="determinate" value={progress} />
            </div> */}
          </>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                paddingTop: 0,
                padding: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2">Xem:&nbsp;</Typography>
                <IconButtonBase
                  iconName={Grid8}
                  tooltip="Xem dạng lưới"
                  size="large"
                  onClick={() => setView('grid')}
                />
                <IconButtonBase
                  iconName={HambergerMenu}
                  size="large"
                  onClick={() => setView('list')}
                  tooltip="Xem dạng danh sách"
                />
              </div>
              <SearchBar
                placeholder="Nhập tên hình ảnh..."
                // onSubmit={setSearch}
                onSubmit={handleSearch}
                width={400}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                paddingTop: 0,
                padding: 16,
              }}
            >
              {listFileImage.length === 0 ? 'Không có hình ảnh' : null}
            </div>
            {view === 'grid' ? (
              <Stack direction="row" flexWrap="wrap">
                {listFileImage
                  // .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((item, index) => (
                    <label
                      htmlFor={`checkbox-${index}`}
                      key={index}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: '#eee',
                        marginRight: 16,
                        marginBottom: 16,
                        width: 150,
                        height: 150,
                        padding: 4,
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'contain',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                        src={item.url}
                        alt={item.name ?? ''}
                      />
                      <span
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name ?? ''}
                      </span>
                      <Checkbox
                        id={`checkbox-${index}`}
                        sx={{position: 'absolute', top: -10, left: -10}}
                        checked={listChecked.indexOf(item.url) > -1}
                        onChange={(e, checked) => {
                          let newList = [...listChecked];
                          if (multiple) {
                            if (checked) {
                              newList.push(item.url);
                            } else {
                              newList = newList.filter(url => url !== item.url);
                            }
                            setListChecked(newList);
                          } else {
                            if (checked) {
                              setListChecked([item.url]);
                            } else {
                              setListChecked([]);
                            }
                          }
                        }}
                      />
                    </label>
                  ))}
              </Stack>
            ) : (
              <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {listFileImage
                  // .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((item, index) => (
                    <label
                      htmlFor={`checkbox-${index}`}
                      key={index}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <ListItem
                        secondaryAction={
                          <Checkbox
                            id={`checkbox-${index}`}
                            sx={{position: 'absolute', top: -10, left: -10}}
                            checked={listChecked.indexOf(item.url) > -1}
                            onChange={(e, checked) => {
                              let newList = [...listChecked];
                              if (multiple) {
                                if (checked) {
                                  newList.push(item.url);
                                } else {
                                  newList = newList.filter(url => url !== item.url);
                                }
                                setListChecked(newList);
                              } else {
                                if (checked) {
                                  setListChecked([item.url]);
                                } else {
                                  setListChecked([]);
                                }
                              }
                            }}
                          />
                        }
                      >
                        <ListItemAvatar>
                          <img
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: 'contain',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                            }}
                            src={item.url}
                            alt={item.name ?? ''}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name ?? ''}
                          secondary={
                            <React.Fragment>
                              <p>
                                <Typography
                                  sx={{display: 'inline'}}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Ngày tạo:&nbsp;
                                </Typography>
                                {moment(item.LastModified).format('HH:mm - DD/MM/YYYY')}
                              </p>
                              <p>
                                <Typography
                                  sx={{display: 'inline'}}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Người tạo:&nbsp;
                                </Typography>
                                {item.owner}
                              </p>
                              <p>
                                <Typography
                                  sx={{display: 'inline'}}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Kích thước:&nbsp;
                                </Typography>
                                {item.Size > 1048576
                                  ? `${(item.Size / 1024 / 1024).toFixed(3)}MB`
                                  : `${(item.Size / 1024).toFixed(3)}KB`}
                              </p>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </label>
                  ))}
              </List>
            )}
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {pagination.page < pagination.totalPage ? (
                isFetching ? (
                  <CircularProgress size={24} />
                ) : (
                  <Button variant="text" onClick={handleLoadMore}>
                    Xem thêm...
                  </Button>
                )
              ) : null}
            </div>
          </>
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack flex={1} direction="row" justifyContent="flex-end">
          <LoadingButton
            // disabled={isSubmitting}
            variant="outlined"
            onClick={onClose}
            sx={{minWidth: 150}}
          >
            Hủy
          </LoadingButton>
          <div style={{width: 24}} />
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            sx={{minWidth: 150}}
            onClick={handleSubmit}
          >
            {isUpload ? 'Bắt đầu upload' : 'Hoàn thành'}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMediaUpload;
