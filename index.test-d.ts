import {expectType} from 'tsd';
import mergeOptions from '.';

expectType<(...options: any[]) => any>(mergeOptions);
expectType<(...options: any[]) => any>(mergeOptions.bind({ignoreUndefined: true}));

expectType<any>(mergeOptions({}, {}));

console.log(mergeOptions({answer: 'The Number of the Beast'}, {answer: 42}));
