class Singer {
  constructor(
    nameSinger,
    followers,
    following,
    favoriteRate,
    viewMusic,
    profileUrl,
    coverUrl,
    songs,
    singerList
  ) {
    this.id = Math.ceil(new Date().getTime() * Math.random());
    this.nameSinger = nameSinger;
    this.followers = followers;
    this.following = following;
    this.favoriteRate = favoriteRate;
    this.viewMusic = viewMusic;
    this.profileUrl = profileUrl;
    this.coverUrl = coverUrl;
    this.songs = songs;
    this.singerList = singerList;
  }

  //!Create Singer Page FUNC
  showSingerInfo(singer) {
    const coverSinger = document.querySelector(".singer__cover");
    const profileSinger = document.querySelector(".singer__profile-box");
    const nameSinger = document.querySelector(".singer__profile-title");
    const followersSinger = document.getElementById("Followers");
    const followingSinger = document.getElementById("following");
    const favoriteSinger = document.getElementById("favorite");
    const viewSinger = document.getElementById("viewMusic");
    const musicList = document.getElementById("MusicList");
    //!Add Cover
    coverSinger.innerHTML = `<img
      class="singer__cover-image"
      src="${singer.coverUrl}" />`;

    //!Add Profile
    profileSinger.innerHTML = `<img
      class="singer__profile-img"
      src="${singer.profileUrl}" />`;

    //!Change Name
    nameSinger.textContent = singer.nameSinger;

    //!Change Info
    followersSinger.textContent = singer.followers;
    followingSinger.textContent = singer.following;
    favoriteSinger.textContent = singer.favoriteRate;
    viewSinger.textContent = singer.viewMusic;

    //!Music List Info
    musicList.innerHTML = "";
    singer.songs.forEach((sound) => {
      const createItemElm = document.createElement("li");
      createItemElm.className = "main__content-item";
      createItemElm.innerHTML = `<div class="main__content-details">
      <div class="main__content-box">
        <div class="main__content-img">
          <img
            class="main__content-pic"
            src="${sound.cover}" />
          <div class="main__content-play plays${sound.id}">
            <i
              class="fa-solid fa-play play${sound.id} main__content-play-icon"></i>
          </div>
        </div>
        <span class="main__content-text">${sound.name}</span>
      </div>
      <div class="main__content-times">
        <span class="main__content-time">${sound.time}</span>
      </div>
      <div class="main__content-times">
        <span class="main__content-time">$${sound.price}</span>
      </div>
    </div>
    <div class="main__content-cart">
       <div class="main__content-times card${sound.id}">
        <span class="main__content-card">ADD TO CARD</span>
      </div>
      <div class="main__content-times favorite${sound.id}">
        <i class="fa-regular fa-heart main__content-icon"></i>
      </div>
    </div>`;
      musicList.append(createItemElm);

      //!Event Play Music
      const playIcon = createItemElm.querySelector(`.plays${sound.id}`);
      playIcon.addEventListener("click", () => {
        this.playMusic(sound.source, sound.id);
      });

      //!Event Add To Card
      const cardIcon = createItemElm.querySelector(`.card${sound.id}`);
      cardIcon.addEventListener("click", () => {
        this.addToCard(sound.id, singer.id);
      });

      //!Event Add To Favorite
      const favoriteIcon = createItemElm.querySelector(`.favorite${sound.id}`);
      favoriteIcon.addEventListener("click", () => {
        this.addToFavorite(sound.id, singer.id);
      });
    });
  }

  //!Find Singer Func
  findSingerFunc(singerId) {
    return this.singerList.singers.find((event) => event.id == singerId);
  }

  findsSounds(soundId, singerId) {
    const findSinger = this.findSingerFunc(singerId);
    return findSinger.songs.find((event) => event.id == soundId);
  }

  //!Add To Card FUNC
  addToCard(soundId, singerId) {
    const findSounds = this.findsSounds(soundId, singerId);
    MyApp.getCard().add(findSounds);
  }

  //!Add To Favorite FUNC
  addToFavorite(soundId, singerId) {
    const findSounds = this.findsSounds(soundId, singerId);
    MyApp.getFavorite().add(findSounds);
  }

  //!Play Music FUNC
  playMusic(source, id) {
    const footer = document.querySelector(".footer");
    const allMusicIcon = document.querySelectorAll(".main__content-play-icon");
    allMusicIcon.forEach((icon) => {
      icon.classList.replace("fa-pause", "fa-play");
    });
    const musicIcon = document.querySelector(`.play${id}`);
    if (musicIcon) {
      musicIcon.classList.replace("fa-play", "fa-pause");
    }
    const createAudioElm = document.createElement("audio");
    footer.innerHTML = "";

    createAudioElm.classList.add("footer__audio");
    createAudioElm.setAttribute("controls", "");
    createAudioElm.innerHTML = `<source class="footer__audio-source" type="audio/mpeg" src="${source}">`;
    footer.style.display = "block";
    createAudioElm.play();
    footer.append(createAudioElm);
  }

  //!create Singer Click Handler
  createSingerClickHandler(singerId) {
    const musicList = document.getElementById("MusicList");
    const findSinger = this.findSingerFunc(singerId);
    //!Empty Music List
    musicList.innerHTML = "";
    this.showSingerInfo(findSinger);
  }

  //!Other Singer Info FUNC
  otherSingerInfo(allSingerInfo) {
    const swiperList = document.getElementById("swiper-wrapper");
    swiperList.innerHTML = "";
    allSingerInfo.forEach((singer, index) => {
      const createSingerElm = document.createElement("div");
      (createSingerElm.className = "swiper-slide main__swipper-slide"),
        (createSingerElm.innerHTML = `<img
    class="w-100 main__swipper-img"
    src="${singer.profileUrl}"/>`);
      swiperList.append(createSingerElm);

      //!Active First Element
      if (index === 0) {
        createSingerElm.classList.add("active");
      }
      createSingerElm.addEventListener("click", (event) => {
        this.createSingerClickHandler(singer.id);
        const allSlide = document.querySelectorAll(".main__swipper-img");
        //!Delete Active classs
        allSlide.forEach((slide) => {
          slide.parentElement.classList.remove("active");
        });
        //!Add Active Class
        event.target.parentElement.classList.add("active");
      });
    });
  }
}
class Basket {
  constructor() {
    this.basketArrays = new Set([]);
  }

  add(sound) {
    this.basketArrays.add(sound);
    this.showCard();
    this.calculateTotalPrice();
    new Toast("Add To Basket").success();
  }
  //!showCard FUNC
  showCard() {
    const basketList = document.querySelector(".header__card-box");
    const basketLength = document.querySelector(".header__links-text");

    //!Empty Basket List
    basketList.innerHTML = "";

    //!show Item Basket
    this.basketArrays.forEach((basket) => {
      const musicItemElem = document.createElement("div");
      musicItemElem.className = `header__card-item item${basket.id}`;
      musicItemElem.innerHTML = `<div class="header__card-info">
    <img class="header__card-img" src="${basket.cover}">
    <span class="header__card-text">${basket.name}</span>
  </div>
  <span class="header__card-price">$${basket.price}</span>`;
      basketList.prepend(musicItemElem);
      musicItemElem.addEventListener("click", (event) => {
        const musicIdElm = event.currentTarget.classList[1].slice(4);
        this.removeCard(musicIdElm);
      });
    });

    //!show Size Basket
    basketLength.textContent = this.basketArrays.size;
  }

  //!Remove Card Music FUNC
  removeCard(musicId) {
    const findMusicCard = Array.from(this.basketArrays).find(
      (item) => item.id == musicId
    );
    this.basketArrays.delete(findMusicCard);
    this.showCard();
    this.calculateTotalPrice();

    new Toast("Remove To Basket").danger();
  }

  //!Calculate Total Price Func
  calculateTotalPrice() {
    const totalPriceElm = document.querySelector(".header__card-total-value");
    const convertBasket = Array.from(this.basketArrays);
    const totalPrice = convertBasket.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.price;
    }, 0);

    totalPriceElm.textContent = `$${totalPrice}`;
  }
}

class Toast {
  toastElm;
  text;
  toastMessage;

  constructor(text) {
    this.toastMessage = document.getElementById("toastMessage");
    this.text = text;
    this.createElement();
  }

  createElement() {
    this.toastElm = document.createElement("div");
    this.toastElm.classList.add("Toast");
    this.toastElm.textContent = this.text;
  }

  danger() {
    this.toastElm.setAttribute("id", "delToast");
    this.toastMessage.append(this.toastElm);
    this.remove();
  }
  success() {
    this.toastElm.setAttribute("id", "addToast");
    this.toastMessage.append(this.toastElm);
    this.remove();
  }

  remove() {
    setTimeout(() => {
      this.toastElm.remove();
    }, 2000);
  }
}

class Favorite {
  constructor() {
    this.favoriteList = new Set([]);
  }

  add(favorite) {
    this.favoriteList.add(favorite);
    this.showFavorite();
    new Toast("Add To Favorite").success();
  }

  //!show Favorite FUNC
  showFavorite() {
    const favoriteElm = document.querySelector(".main__content-inside");

    //!Empty Basket List
    favoriteElm.innerHTML = "";

    //!show Item Basket
    this.favoriteList.forEach((favorite) => {
      const favoriteItemElem = document.createElement("div");
      favoriteItemElem.className = `main__content-singer item${favorite.id}`;
      favoriteItemElem.innerHTML = `
    <img class="main__content-singer-img"
     src="${favorite.cover}">
    <span class="main__content-singer-delete">Delete In Favorite</span>`;

      favoriteElm.prepend(favoriteItemElem);

      favoriteItemElem.addEventListener("click", (event) => {
        const favoriteIdElm = event.currentTarget.classList[1].slice(4);
        this.removeFavorite(favoriteIdElm);
      });
    });

    //!Text Favorite

    this.favoriteList.size == 0
      ? (favoriteElm.textContent = "There is nothing to show")
      : "";
  }

  //!Remove Favorite Music FUNC
  removeFavorite(musicId) {
    const findMusicFavorite = Array.from(this.favoriteList).find(
      (item) => item.id == musicId
    );
    this.favoriteList.delete(findMusicFavorite);
    this.showFavorite();
    new Toast("Remove To Favorite").danger();
  }
}

class ShowTime {
  constructor() {
    this.getDateFunc();
    this.getTimeFunc();
  }

  //!Get DATE FUNC
  getDateFunc() {
    const dateElm = document.querySelector(".header__item-date-box");
    const newDate = new Date();
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(newDate);
    dateElm.textContent = dateFormatter;
  }

  //!Get Time FUNC
  getTimeFunc() {
    const timeElm = document.querySelector(".header__item-time-box");
    setInterval(() => {
      const newDate = new Date();
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(newDate);
      timeElm.textContent = dateFormatter;
    }, 1000);
  }
}

class SingerList {
  constructor() {
    this.singers = [];
  }

  addSinger(
    nameSinger,
    followers,
    following,
    favoriteRate,
    viewMusic,
    profileUrl,
    coverUrl,
    songs
  ) {
    const newSinger = new Singer(
      nameSinger,
      followers,
      following,
      favoriteRate,
      viewMusic,
      profileUrl,
      coverUrl,
      songs,
      this
    );
    this.singers.push(newSinger);
    newSinger.showSingerInfo(this.singers[0]);
    newSinger.otherSingerInfo(this.singers);
  }
}

class Sound {
  constructor() {
    this.singerList = new SingerList();
    this.basket = new Basket();
    this.favorite = new Favorite();
    this.showTime = new ShowTime();
    this.generateSingerList();
    this.showCardClickHandler();
  }

  generateSingerList() {
    const Maneskin = [
      {
        id: 5,
        name: "AzAval",
        price: 35,
        cover: "public/Music/shayea/azAval.jpg",
        time: "3:36",
        source: "public/Music/shayea/azAval.mp3",
      },
      {
        id: 6,
        name: "HameMan",
        price: 45,
        cover: "public/Music/shayea/hameMan.webp",
        time: "4:32",
        source: "public/Music/shayea/HameMan.mp3",
      },
    ];
    this.singerList.addSinger(
      "Maneskin",
      "2,245,233",
      "1",
      "2",
      "16,245,233",
      "public/images/8.webp",
      "public/images/7.avif",
      Maneskin
    );
    const swift = [
      {
        id: 9,
        name: "Blank Space",
        price: 35,
        cover: "public/Music/swift/Blank Space.jpg",
        time: "3:51",
        source: "public/Music/swift/Blank Space.mp3",
      },
      {
        id: 10,
        name: "carma",
        price: 45,
        cover: "public/Music/swift/carma.jpg",
        time: "3:24",
        source: "public/Music/swift/carma.mp3",
      },
      {
        id: 11,
        name: "Miss Americana",
        price: 55,
        cover: "public/Music/swift/Miss Americana.jpg",
        time: "3:54",
        source: "public/Music/swift/Miss Americana.mp3",
      },
    ];
    this.singerList.addSinger(
      "taylor swift",
      "81,245,233",
      "15",
      "4",
      "35,245,233",
      "public/images/Taylor Swift/profile.jpg",
      "public/images/Taylor Swift/cover.jpg",
      swift
    );
  }

  showCardClickHandler() {
    const basketElm = document.querySelector(".header__links-shop");
    const basketBox = document.querySelector(".header__card");

    basketElm.addEventListener("click", () => {
      basketBox.classList.toggle("hidden");
    });
  }
}

class MyApp {
  static init() {
    this.mySound = new Sound();
  }
  static getCard() {
    return this.mySound.basket;
  }
  static getFavorite() {
    return this.mySound.favorite;
  }
}

MyApp.init();
