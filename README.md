# Hold my Beer

App still in progress

- Share your beers
- Vote your favourite beer
- Check Top 50
- Find beers
- Add new beers
- Edit your profile (avatar, app name...)

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
  margin: 1.25;
}
```
