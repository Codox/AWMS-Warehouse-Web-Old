export interface Warehouse {
  uuid: string;
  name: string;
  contactTelephone: string;
  addressLines: string[];
  town: string;
  region: string;
  city: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
