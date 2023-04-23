import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}

      //1. modified the onclick function 
      onClick={()=>onClickHandler(index)}
    >
      {text}
    </li>
  );
};

//2. changed index and isSelected to isRequired
WrappedSingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {

  //3. corrected the syntax of useState
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem

        //4. provided key to list elements
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={index===selectedIndex}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {

  //5. changed array to arrayOf and shapeOf to shape
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {

  //6. added array of items as it cannot be null
  items: [{text: "Anvi Aggarwal"}, {text: "12016188"}, {text: "B.Tech CSE"}, {text: "Frontend Assignment"}],
};

const List = memo(WrappedListComponent);

export default List;