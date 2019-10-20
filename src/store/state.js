import {playMode} from '../common/js/config'
import { loadSearch, loadPlay,loadFav} from '../common/js/catch'
export default {
    singer:{},
    //播放器数据
    playing:false,
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    songListId:null,
    listData:null,
    rankList:null,
    searchHistory:loadSearch(),
    playHistory:loadPlay(),
    favoriteList:loadFav()
}
 