import React from 'react'
import {Div} from 'glamorous'
import {css} from 'glamor'
import Downshift from 'downshift'
import {
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
} from './inputDropdown'

function Dropdown({itemToString, items, ...rest}) {
  return (
    <Downshift itemToString={itemToString} {...rest}>
      {({
        getInputProps,
        getToggleButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => (
        <div className={css({width: 280, margin: 'auto'})}>
          <Div position="relative" css={{paddingRight: '1.75em'}}>
            <Input
              {...getInputProps({
                isOpen,
                placeholder: 'Select an answer type',
              })}
            />
            {selectedItem ? (
              <ControllerButton
                css={{paddingTop: 4}}
                onClick={clearSelection}
                aria-label="clear selection"
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getToggleButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </Div>
          {!isOpen ? null : (
            <Menu>
              {items.map((item, index) => (
                <Item
                  key={item.id}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                  })}
                >
                  {itemToString(item)}
                </Item>
              ))}
            </Menu>
          )}
        </div>
      )}
    </Downshift>
  )
}

export default Dropdown;

