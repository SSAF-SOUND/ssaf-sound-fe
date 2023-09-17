/* https://github.com/kkomelin/isomorphic-dompurify/issues/91#issuecomment-1385315664 */
import { TextEncoder, TextDecoder } from 'node:util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
