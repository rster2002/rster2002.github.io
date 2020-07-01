# ASN1 encoding

[toc]

## Encoding

Encoding data using ASN1 is done using TLV, or Type-Length-Value. Each piece of data included in the encoding uses this format to encode it's data.

### Type

| 7     | 6     | 5    | 4    | 3    | 2    | 1    | 0    |
| ----- | ----- | ---- | ---- | ---- | ---- | ---- | ---- |
| Class | Class | Form | Tag  | Tag  | Tag  | Tag  | Tag  |

The type tells the encoder how to treat the TLV. The class can be one of the following values:

|  7   |  6   | Class            |
| :--: | :--: | ---------------- |
|  0   |  0   | UNIVERSAL        |
|  0   |  1   | APPLICATION      |
|  1   |  0   | Context-specific |
|  1   |  1   | PRIVATE          |

The form tells the encoder if there are any other TLV values in the value of this block. 0 means it's a primative value and 1 tells it that it's a constructed value.