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

## Modified package node_modules **@ui-kitten/components/ui/modal** modal.component.js line 108

```jsx
import { LogBox } from 'react-native';

    render() {
        LogBox.ignoreAllLogs();
        return null;
    }
```
