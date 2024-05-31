/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductListResponse {
  results: ProductResponse[];
  filters: Filter[];
}

export interface Filter {
  id: string;
  name: string;
  type: string;
  values: Value[];
}

interface Value {
  id: string;
  name: string;
  path_from_root: PathFromRoot[];
}

interface PathFromRoot {
  id: string;
  name: string;
}

export interface ProductResponse {
  id: string;
  title: string;
  condition: 'new' | 'used';
  thumbnail: string;
  currency_id: string;
  price: number;
  shipping: Shipping;
  pictures?: Picture[];
}

interface Shipping {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: LogisticType;
  mode: Mode;
  tags: Tag[];
  benefits: null;
  promise: null;
}

enum LogisticType {
  CrossDocking = 'cross_docking',
  DropOff = 'drop_off',
  NotSpecified = 'not_specified',
  XdDropOff = 'xd_drop_off',
}

enum Mode {
  Me2 = 'me2',
  NotSpecified = 'not_specified',
}

enum Tag {
  IsFlammable = 'is_flammable',
  MLACHGThresholdEne24 = 'MLA-CHG-threshold-ene-24',
  MLACHGThresholdNov23 = 'MLA-CHG-threshold-nov-23',
  MLAChgThresholdAgo22 = 'MLA-chg-threshold-ago-22',
  MandatoryFreeShipping = 'mandatory_free_shipping',
  SelfServiceIn = 'self_service_in',
  SelfServiceOut = 'self_service_out',
}

export interface DescriptionResponse {
  text: string;
  plain_text: string;
  last_updated: Date;
  date_created: Date;
  snapshot: Snapshot;
}

interface Snapshot {
  url: string;
  width: number;
  height: number;
  status: string;
}

export interface Picture {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
}

interface Shipping {
  free_shipping: boolean;
}
