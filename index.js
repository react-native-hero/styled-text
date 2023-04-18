'use strict'

import React, {
  PureComponent,
} from 'react'

import {
  Text,
  StyleSheet,
} from 'react-native'

import {
  parseText,
  patternMap,
} from '@yorkjs/pattern'

const styles = StyleSheet.create({
  link: {
    color: '#2440b3',
  },
  highlight: {
    color: 'red',
  }
})

export class StyledText extends PureComponent {

  static defaultProps = {}

  render() {

    let {
      patterns,
      children,

      telText,
      telStyle,
      onTelPress,

      urlText,
      urlStyle,
      onUrlPress,

      emailText,
      emailStyle,
      onEmailPress,

      imageText,
      imageStyle,
      onImagePress,

      highlightStyle,

      ...textProps
    } = this.props

    const renderText = function (text, textProps) {
      const tokens = parseText(
        text,
        patterns
          ? patterns.map(name => patternMap[name])
          : undefined
      )
      if (tokens.length >= 1) {
        return (
          <Text
            {...textProps}
          >
            {
              tokens.map((token, index) => {
                let text = token.text, style, onPress

                if (token.type === 'tel') {
                  style = telStyle || styles.link
                  if (telText) {
                    text = telText
                  }
                  if (onTelPress) {
                    onPress = () => {
                      onTelPress(token.data.tel)
                    }
                  }
                }
                else if (token.type === 'url') {
                  style = urlStyle || styles.link
                  if (urlText) {
                    text = urlText
                  }
                  if (onUrlPress) {
                    onPress = () => {
                      onUrlPress(token.data.url)
                    }
                  }
                }
                else if (token.type === 'email') {
                  style = emailStyle || styles.link
                  if (emailText) {
                    text = emailText
                  }
                  if (onEmailPress) {
                    onPress = () => {
                      onEmailPress(token.data.email)
                    }
                  }
                }
                else if (token.type === 'image') {
                  style = imageStyle || styles.link
                  if (imageText) {
                    text = imageText
                  }
                  if (onImagePress) {
                    onPress = () => {
                      onImagePress(token.data.url)
                    }
                  }
                }
                else if (token.type === 'highlight') {
                  style = highlightStyle || styles.highlight
                  text = token.data.text
                }

                return (
                  <Text
                    key={`${index}-${token.text}`}
                    style={style}
                    onPress={onPress}
                  >
                    {text}
                  </Text>
                )
              })
            }
          </Text>
        )
      }
      return (
        <Text
          {...textProps}
        >
          {text}
        </Text>
      )
    }

    if (typeof children === 'string') {
      children = renderText(children, textProps)
    }
    else if (typeof children === 'number') {
      children = renderText('' + children, textProps)
    }
    else if (children && children.length > 1) {
      const nodes = []
      for (let i = 0, len = children.length; i < len; i++) {
        let node = children[i]
        if (typeof children[i] === 'string') {
          node = renderText(
            children[i],
            {
              key: `${i}_${children[i]}`,
              ...textProps
            }
          )
        }
        else if (typeof children[i] === 'number') {
          node = renderText(
            '' + children[i],
            {
              key: `${i}_${children[i]}`,
              ...textProps
            }
          )
        }
        if (node) {
          nodes.push(node)
        }
      }
      if (nodes.length > 0) {
        children = (
          <Text
            {...textProps}
          >
            {nodes}
          </Text>
        )
      }
    }

    return children || null

  }
}
