# Hold my Beer

App still in progress

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

## Modified package node_modules **react-native-dropdown-picker** /src/components/RenderListItem.js line 165

```jsx
<TouchableOpacity
  style={_listItemContainerStyle}
  onPress={__onPress}
  onLayout={onLayout}
  {...props}
  disabled={selectable === false || disabled}
  testID={item.testID}>
  {IconComponent}
  {item.flag ? (
    <>
      <Text
        style={{
          marginLeft: 10,
          marginRight: 20,
          fontSize: 30,
        }}>
        {item.flag ? item.flag : ''}
      </Text>
      <Text style={_listItemLabelStyle}>{label}</Text>
    </>
  ) : (
    <Text style={[_listItemLabelStyle, {marginLeft: 10}]}>{label}</Text>
  )}
  {_TickIconComponent}
</TouchableOpacity>
```

## Modified package node_modules **@ui-kitten/components/ui/modal** modal.component.js

```jsx
    this.myEvent = null;

    componentDidMount() {
        this.myEvent = react_native_1.Dimensions.addEventListener('change', this.onDimensionChange);
        if (!this.modalId && this.props.visible) {
            this.show();
            return;
        }
    }

    componentWillUnmount() {
        this.myEvent.remove();
        this.hide();
    }
```

## Modified package node_modules **react-native-walkthrough-tooltip/src/** tooltip.js

```jsx
  import { LogBox } from 'react-native';

  LogBox.ignoreAllLogs()

  this.myEvent = null;

  componentDidMount() {
    this.myEvent = Dimensions.addEventListener('change', this.updateWindowDims);
  }

  componentWillUnmount() {
    this.myEvent.remove();
    if (this.interactionPromise) {
      this.interactionPromise.cancel();
    }
  }
```

## Modified package node_modules **react-native-ratings/dist/components** Star.js and the end of the file

```jsx
starStyle: {
  margin: 1.25,
}
```
