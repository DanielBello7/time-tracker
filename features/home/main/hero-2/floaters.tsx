import * as React from "react";
import { item as val } from "./animate";
import { itemsData } from "./floaters-data"
import { motion } from "framer-motion";
import FloaterItem from "./floater-item";
import classnames from "classnames";

export default function Floaters() {
  return (
    <React.Fragment>
      {itemsData.slice(0, 10).map((item) => {
        const cn = classnames("absolute", item.classnames)
        return (
          <motion.div variants={val} key={item.id} className={cn}>
            <FloaterItem classNames={item.classnames} img={item.img} />
          </motion.div>
        )
      })}
    </React.Fragment>
  )
}
