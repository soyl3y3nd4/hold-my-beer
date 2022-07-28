import React, { Dispatch, SetStateAction } from 'react';
import { Dimensions } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  open: boolean;
  value: string | null | string[];
  items: ItemType[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<any>>;
  modalTitle?: string
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  min?: number;
  mode?: 'SIMPLE' | 'BADGE' | 'DEFAULT';
};

const CustomDropDownPicker = ({ open,
  value,
  items,
  setOpen,
  setValue,
  placeholder = '',
  disabled = false,
  multiple = false,
  min = 0,
  mode = 'SIMPLE',
  modalTitle = ''
}: Props) => {
  return (
    <DropDownPicker
      disabled={disabled}
      listMode="MODAL"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      placeholder={placeholder}
      dropDownDirection="TOP"
      zIndex={2}
      zIndexInverse={1}
      multiple={multiple}
      min={min}
      mode={mode}
      badgeStyle={{
        padding: 5,
      }}
      badgeTextStyle={{
        fontFamily: 'JosefinBold',
        color: 'rgba(0,0,0, 0.75)'
      }}
      badgeDotStyle={{
        borderRadius: 50,
        backgroundColor: 'white'
      }}
      badgeColors={["rgb(71, 141, 255)", "rgb(51, 181, 0)", "rgb(242, 231, 21)", "rgb(249, 212, 174)", "rgb(243, 249, 174)", "rgb(162, 249, 217)", "rgb(187, 246, 249)", "rgb(198, 187, 249)", "rgb(255, 216, 0)"]}
      style={{
        borderWidth: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0)',
        height: 40,
      }}
      ArrowDownIconComponent={({ style }) => (
        <Icon name="chevron-down-outline" size={25} color="rgba(127, 85, 1, 0.5)" style={style} />
      )}
      ArrowUpIconComponent={({ style }) => (
        <Icon name="chevron-up-outline" size={25} color="rgba(127, 85, 1, 0.5)" style={style} />
      )}
      CloseIconComponent={({ style }) => (
        <Icon name="close-outline" size={45} color="rgb(186, 1, 1)" style={style} />
      )}
      TickIconComponent={({ style }) => (
        <Icon name="checkmark-outline" size={27} color="rgb(13, 196, 0)" style={style} />
      )}
      arrowIconStyle={{
        width: 20,
        height: 20,
        marginBottom: 20,
      }}
      tickIconStyle={{
        width: 30,
        height: 30,
      }}
      closeIconStyle={{
        width: 40,
        height: 40
      }}
      labelStyle={{
        fontFamily: 'JosefinBold',
        fontSize: 15,
        color: 'rgb(127, 85, 1)',
      }}
      modalProps={{
        animationType: "slide"
      }}
      modalContentContainerStyle={{
        backgroundColor: 'rgba(255,255,255,1)',
      }}
      modalTitle={modalTitle}
      modalTitleStyle={{
        fontFamily: 'JosefinBold',
        color: 'rgba(0,0,0,0.8)',
        fontSize: 20,
      }}
      listItemLabelStyle={{
        fontFamily: 'JosefinBold',
        color: 'rgba(0,0,0,0.4)',
        fontSize: 18,
      }}
      placeholderStyle={{
        fontSize: 15,
        paddingVertical: 5,
        width: '100%',
        color: 'rgba(127, 85, 1, 0.3)',
        fontFamily: 'JosefinBold',
      }}
    />
  );
};

export default CustomDropDownPicker;
