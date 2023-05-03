export const log = (obj) => {
  console.log(JSON.stringify(obj, null, 2));
};

export const _curry = (fn) => {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };
};

export const _curryr = (fn) => {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a);
  };
};

// 1. 수집하기
export const _map = _curryr((list, mapper) => {
  let new_list = [];

  _each(list, (val) => {
    new_list.push(mapper(val));
  });

  return new_list;
});

export const _identity = (val) => val;

export const _values = _map(_identity);

export const _pluck = (data, key) => {
  return _map(_get(key))(data);
};

// 2. 거르기
export const _filter = _curryr((list, predi) => {
  let new_list = [];

  _each(list, (val) => {
    if (predi(val)) new_list.push(val);
  });

  return new_list;
});

export const _find = _curryr((list, predi) => {
  const keys = _keys(list);

  for (let i = 0; i < keys.length; i++) {
    const value = list[keys[i]];
    if (predi(value)) {
      return value;
    }
  }
});

export const _find_index = _curryr((list, predi) => {
  const keys = _keys(list);

  for (let i = 0; i < keys.length; i++) {
    if (predi(list[keys[i]])) {
      return i;
    }
  }

  return -1;
});

export const _some = (data, predi = _identity) => {
  return _find_index(data, predi) !== -1;
};

export const _negate = (func) => (val) => !func(val);

export const _every = (data, predi = _identity) => {
  return _find_index(data, _negate(predi)) === -1;
};

export const _reject = (data, predi) => _filter(data, _negate(predi));

export const _compact = _filter(_identity);

// 3. 찾아내기
export const _get = _curryr((obj, key) => {
  return !obj ? undefined : obj[key];
});

export const _each = (list, iter) => {
  const keys = _keys(list);

  for (let i = 0; i < keys.length; i++) {
    iter(list[keys[i]]);
  }

  return list;
};

const _rest = (list, num) => {
  return Array.prototype.slice.call(list, num || 1);
};

// 4. 접기
export const _reduce = (list, iter, memo) => {
  if (!memo) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, (val) => {
    memo = iter(memo, val);
  });
  return memo;
};

export const _pipe = (...rest) => {
  const fns = rest;

  return (arg) => {
    return _reduce(
      fns,
      (arg, fn) => {
        return fn(arg);
      },
      arg
    );
  };
};

export const _go = (arg, ...rest) => {
  return _pipe(...rest)(arg);
};

const _is_object = (obj) => {
  return typeof obj === 'object' && !!obj;
};

export const _keys = (obj) => {
  return _is_object(obj) ? Object.keys(obj) : [];
};
