import React, { ReactElement } from "react";
import ListItem, { ListItemProps } from "./ListItem";
interface ListProps {
  data: ListItemProps[];
}

function List({ data }: ListProps): any {
  return data.map((item: ListItemProps) => {
    return (
      <ListItem
        background={item.background}
        city={item.city}
        temperature={item.temperature}
      />
    );
  });
}

export default List;
