<<template>
  <div>
 <div class="playlist">
    <div class="header">
    </div>
    <div class="playlist-tiles">
      <div v-for="(songs, playlistName) in playlists" :key="playlistName" class="playlist-tile" @click="showPlaylistSongs(songs)">
        <img :src="getPlaylistCover(songs)" alt="Playlist Cover" class="playlist-cover">
        <h3>{{ playlistName }}</h3>
      </div>
    </div>
    <div v-if="selectedPlaylist">
      <div class="playlist-display">
      <h3>{{ selectedPlaylistName }}</h3>
      <SongGallery @send-data="handleDataFromChild" :songs="selectedPlaylist" />
      </div>
    </div>
  </div>

  </div>
</template>
<script>
import axios from 'axios';
import SongGallery from './SongGallery.vue'

export default {
 components: {
    SongGallery
  },
  data() {
    return {
      playlistName: 'Playlists',
      playlists: {},
      selectedPlaylist: null,
      selectedPlaylistName: null,
      dataFromChild: ''
    };
  },
  created() {
    this.fetchPlaylists();
  },
  methods: {
    fetchPlaylists() {
      // Make Axios call to fetch playlists
      var userId = localStorage.getItem('user_id');
      axios.get('http://localhost:5000/api/auth/getalbum',{
        params:{
          user_id: userId
        }
      })
        .then(response => {
          this.playlists = response.data.albums;
        })
        .catch(error => {
          console.error('Error fetching playlists');
        });
    },
    showPlaylistSongs(songs) {
      this.selectedPlaylist = songs;
      // Get the playlist name from the clicked playlist
      this.selectedPlaylistName = Object.keys(this.playlists).find(playlistName => this.playlists[playlistName] === songs);
    },
    getPlaylistCover(songs) {
      // Return the cover image of the first song in the playlist
      if (songs.length > 0) {
        return songs[0].cover;
      } else {
        return 'placeholder.jpg'; // Provide a placeholder image if playlist has no songs
      }
    },
    goToHome(){
      this.$router.push('/home')
    },
    handleDataFromChild(data){
      this.dataFromChild = data;
      this.$emit('parent-data',this.dataFromChild);
    }
  }
};
</script>

<style scoped>
.playlist {
  padding: 20px;
}

.playlist-tiles {
  display: flex;
  flex-wrap: wrap;
}

.playlist-tile {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}

.playlist-tile:hover {
  background-color: #f0f0f0;
}

.playlist-cover {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
}
.song {
  color: orange;
}

.playlist-display{
  background-color:orange;

}
.header{
  display:flex;
  gap:1000px;
}

        .backButton{
          background-color: #ff5500;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.3s ease; /* Add a transition effect on transform property */
        }
        .backButton:hover{
          transform: scale(1.1);
        }

</style>


