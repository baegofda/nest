import { Cat } from '../cats.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';

// 데코레이터를 사용하기위함과 상속등으로 재사용성을 증가시키기위해 class를사용
// PickType을 이용하여 필요없는 필드를 상속받지 않는다.
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '234242',
    description: 'id',
  })
  id: string;
}
