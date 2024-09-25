import React from "react";

function List({
  items,
  onHover,
  onClick,
  itemKey,
  nameKey,
  addressKey,
  extraInfoKey,
}) {
  return (
    <div className="overflow-y-auto max-h-96">
      {items.length === 0 ? (
        <p>没有找到项目。</p> 
      ) : (
        <ul>
          {items.map((item) => (
            <li
              key={item[itemKey]}
              className="mb-4 p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onMouseEnter={() => onHover(item)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(item)}
            >
              <h3 className="font-semibold text-lg">{item[nameKey]}</h3>
              <p className="text-sm text-gray-600">{item[addressKey]}</p>
              {extraInfoKey && (
                <p className="text-xs text-gray-500 mt-1">
                  {item[extraInfoKey]}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
