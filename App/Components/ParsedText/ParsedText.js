import React from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';
import TextExtraction from '../../Lib/TextExtraction';

/* eslint-disable no-useless-escape */
const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/,
  email: /\S+@\S+\.\S+/
};

const defaultParseShape = PropTypes.shape({
  ...ReactNative.Text.propTypes,
  type: PropTypes.oneOf(Object.keys(PATTERNS)).isRequired
});

const customParseShape = PropTypes.shape({
  ...ReactNative.Text.propTypes,
  pattern: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)])
    .isRequired
});

const propTypes = {
  ...ReactNative.Text.propTypes,
  parse: PropTypes.arrayOf(
    PropTypes.oneOfType([defaultParseShape, customParseShape])
  ),
  childrenProps: PropTypes.shape(ReactNative.Text.propTypes)
};

const defaultProps = {
  parse: null,
  childrenProps: {}
};

class ParsedText extends React.Component {
  static displayName = 'ParsedText';

  setNativeProps (nativeProps) {
    this.nativePropsRef.setNativeProps(nativeProps);
  }

  getPatterns () {
    return this.props.parse.map(option => {
      const { type, ...patternOption } = option;
      if (type) {
        if (!PATTERNS[type]) {
          throw new Error(`${option.type} is not a supported type`);
        }
        patternOption.pattern = PATTERNS[type];
      }

      return patternOption;
    });
  }

  getParsedText () {
    if (!this.props.parse) {
      return this.props.children;
    }
    if (typeof this.props.children !== 'string') {
      return this.props.children;
    }

    const textExtraction = new TextExtraction(
      this.props.children,
      this.getPatterns()
    );

    return textExtraction
      .parse()
      .map((props, index) => (
        <ReactNative.Text
          key={`parsedText-${index}`}
          {...this.props.childrenProps}
          {...props}
        />
      ));
  }

  render () {
    return (
      <ReactNative.Text
        ref={component => {
          this.nativePropsRef = component;
          return this.nativePropsRef;
        }}
        {...this.props}
      >
        {this.getParsedText()}
      </ReactNative.Text>
    );
  }
}

ParsedText.propTypes = propTypes;
ParsedText.defaultProps = defaultProps;

export default ParsedText;
