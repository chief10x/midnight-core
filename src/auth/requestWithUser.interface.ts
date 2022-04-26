import { Request } from 'express';
import { User } from 'src/schema/auth.schema';
 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;