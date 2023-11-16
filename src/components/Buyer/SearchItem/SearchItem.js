import classNames from "classnames/bind";
import styles from "../SearchItem/SearchItem.module.scss";

const cx = classNames.bind(styles);

function SearchItem() {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("name")}>
        <span>Nguyen Van A</span>
      </p>
    </div>
  );
}

export default SearchItem;
