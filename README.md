# @react-native-hero/styled-text

## Getting started

Install the library using either Yarn:

```
yarn add @react-native-hero/styled-text
```

or npm:

```
npm install --save @react-native-hero/styled-text
```

## Example

```js
import {
  StyledText,
} from '@react-native-hero/styled-text'

<StyledText
  numberOfLines={2}
  style={{color: 'blue', fontSize: 14}}

  telText="电话"
  telStyle={{color: 'red'}}
  onTelPress={tel => {

  }}
  urlText="链接"
  urlStyle={{color: 'red'}}
  onUrlPress={url => {

  }}
  emailText="邮箱"
  emailStyle={{color: 'red'}}
  onEmailPress={email => {

  }}
  highlightStyle={{color: 'red'}}
>
  请点击https://www.baidu.com，请联系13512345678，请发送邮箱adsadasd@qq.com，高亮<i>关键字</i>
</StyledText>
```
