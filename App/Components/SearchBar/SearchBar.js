import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { Colors } from '../../Themes/';
import { addComponentExample } from '../../Services/ExamplesRegistry';

// Note that this file is
// imported in DevScreens/ComponentExamplesScreen/ComponentImports,
// otherwise your component won't be compiled
// and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Search Bar', () => (
  <SearchBar containerStyle={{ marginBottom: 20 }} />
));

const propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  searchInputStyle: ViewPropTypes.style,
  cancelButtonStyle: ViewPropTypes.style
};

const defaultProps = {
  onSearch: () => console.log('onSearch'),
  onCancel: () => console.log('onCancel'),
  containerStyle: {},
  searchInputStyle: {},
  searchTerm: ''
};

class SearchBar extends React.Component {
  render () {
    const { onSearch, onCancel, searchTerm } = this.props;
    const onSubmitEditing = () => onSearch(searchTerm);
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TextInput
          ref='searchText'
          autoFocus
          placeholder='Search'
          placeholderTextColor={Colors.snow}
          underlineColorAndroid='transparent'
          style={[styles.searchInput, this.props.searchInputStyle]}
          // value={this.props.searchTerm}
          onChangeText={onSearch}
          autoCapitalize='none'
          onSubmitEditing={onSubmitEditing}
          returnKeyType={'search'}
          autoCorrect={false}
          selectionColor={Colors.snow}
        />
        <TouchableOpacity
          onPress={onCancel}
          style={[styles.cancelButton, this.props.cancelButtonStyle]}
        >
          <Text style={styles.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
