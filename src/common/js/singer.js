export default class Singer {
  constructor({mid, name}) {
    this.singer_mid = mid
    this.singer_name = name
    this.singer_pic = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
  }
}