import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropdownContext, MenuItem } from '../dropdown';

export function ListItem(props) {
	// Proptypes is linting so index does not show up in consumer proptypes
	// eslint-disable-next-line react/prop-types
	const { id, disabled, index, children } = props;

	const { onItemSelect, focusedMenuItem, setFocusedMenuItem } = useDropdownContext();
	const selected = focusedMenuItem === index;

	const handleItemSelect = useCallback(
		() => {
			setFocusedMenuItem(index);

			if (!disabled) {
				onItemSelect(id);
			}
		},
		[onItemSelect, id, disabled, index],
	);

	return (
		<MenuItem
			onClick={handleItemSelect}
			onFocus={handleItemSelect}
			disabled={disabled}
			index={index}
			role="option"
			aria-selected={selected}
		>
			{children}
		</MenuItem>
	);
}

ListItem.propTypes = {
	/** Passed to the onItemSelect function */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

ListItem.isFocusableMenuChild = true;
