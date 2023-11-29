import classNames from "classnames/bind";
import styles from "../SearchSuggestItem/SearchSuggestItem.module.scss";

const cx = classNames.bind(styles);

function SearchSuggestItem({data}) {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("name")}>
        <span>Nguyen Van A</span>
      </p>
    </div>
  );
}

export default SearchSuggestItem;