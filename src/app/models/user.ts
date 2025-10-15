import { Profile } from "./profile";

export interface User {
  id: string;              
  username: string;        
  password: string;        
  name: string;            
  lastName: string;        
  secondLastName: string;  
  phoneNumber: string;     
  email: string;          
  enabled: boolean;        
  profile: Profile | null;        
}
