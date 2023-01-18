export interface ResponseData<T> {
  data: T;
  errors: string[] | null;
  succeeded: boolean;
  message: string;
}

export interface PaginationParams {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface ResultData<T> extends PaginationParams {
  data: T[];
}

export interface QueryParams {
  search?: string;
  pageNumber?: number | string;
  pageSize?: number | string;
  [x: string]: any;
}

export interface TimeStamp {
  createdBy?: any;
  created?: string;
  lastModifiedBy?: any;
  lastModified?: any;
}

export type PathParams = {
  loaiChuSoHuu?: string;
  trangThai?: string;
  loaiTaiSan?: string;
  idTaiSan?: string;
  idPhieuYeuCau?: string;
  loaiMMTB?: string;
  thongTinPTVT?: string;
  thongTinMMTB?: string;
  thaoTac?: string;
  idHoSo?: string;
  loaiChungCu?: string;
  idBieuMau?: string;
  thongTinNhaDat?: string;
  slug?: string;
};

export interface DinhKem extends TimeStamp {
  id: number;
  ten: string;
  ptvtSoSanhId?: number;
  mmtbSoSanhId?: number;
  moTa?: string;
  duongDan: string;
  duongDanXoa: string;
  loai?: string;
  loaiFile?: string;
  loaiDinhKem?: string;
  trangThai?: boolean;
}
