function _adoptChildren(it, adopted) {
  const {
    value: element,
    done
  } = it.next(adopted);
  if (done) return element;

  element.props.children = adopted => _adoptChildren(it, adopted);

  return element;
}

class Title extends React.Component {
  render() {
    function* _adopter() {
      const counter = Math.random() > 0.5 ? yield <Counter /> : 42;
      return <span>{'The answer is ' + counter}</span>;
    }

    return _adoptChildren(_adopter());
  }

}