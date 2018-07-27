import React from 'react';

const Name = ({name}) =>
    <h1 className={`ui inverted header ${name && name.length > 20 ? name.length > 100 ? 'tiny' : 'smaller' : ''}`}>
        {name}
    </h1>;

export default Name;