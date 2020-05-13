import React from "react"

function CategoryList(props) {
    return (
        <div className="CategoryList">
            {
                props.categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => props.getQuestion(category.id, category.clues_count - 1)}
                    >
                        {category.title}
                    </button>
                ))
            }
        </div>
    )
}

export default CategoryList