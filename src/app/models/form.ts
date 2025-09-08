export interface Form {
  id: number;
  url: string;
  name: string;
  icon: string;
  visible: boolean;        
  parent?: Form | null;        
}
