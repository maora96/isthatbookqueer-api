import { IsBoolean } from 'class-validator';

export class ChangeApprovalDTO {
  @IsBoolean({ message: 'Approved must be a boolean.' })
  approved: boolean;
}
