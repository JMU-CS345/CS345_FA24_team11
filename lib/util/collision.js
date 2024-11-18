
const checkSquares = (s1, s2) => {
  return  s1.x < (s2.x + s2.w) &&
          s2.x < (s1.x + s1.w) &&
          s1.y < (s2.y + s2.h) &&
          s2.y < (s1.y + s1.h);
}


const smallHadronCollider = (plyr, map) => {


  x1 = Math.floor((plyr.xPos) / Game.BLOCKSIZE);
  x2 = Math.floor((plyr.xPos + 31) / Game.BLOCKSIZE);
  y1 = Math.floor((plyr.yPos) / Game.BLOCKSIZE);
  y2 = Math.floor((plyr.yPos + 31) / Game.BLOCKSIZE);

  for (let i = x1; i < x2 + 1; i++)
    for (let j = y1; j < y2 + 1; j++)
      if (Game.MAP.fetchBlock(j, i).checkCoin())
        return true;
}         