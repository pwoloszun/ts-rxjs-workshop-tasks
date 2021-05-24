import { xxx, ggg } from './some-subdir/my-exports';
import myExports from './some-subdir/my-exports';

export function myImportsApp() {
  console.log('myImportsApp', xxx, ggg());
}
