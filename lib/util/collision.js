
const checkSquares = (s1, s2) => {
  return  s1.x < (s2.x + s2.w) &&
          s2.x < (s1.x + s1.w) &&
          s1.y < (s2.y + s2.h) &&
          s2.y < (s1.y + s1.h);
}

