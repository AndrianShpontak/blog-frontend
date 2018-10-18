import React from 'react';

const Post = function (props) {
    return (
        <div>
            <span>{`${props.postAuthor.firstName} ${props.postAuthor.lastName}`}</span>
           <h2>
               {props.title}
           </h2>
            <p>
                {props.body}
            </p>
            <p>
                {props.description}
            </p>
            <span>
                {props.date}
            </span>
        </div>

    )
};
export default Post