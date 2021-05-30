import {
    faCat,
    faCrow,
    faDog,
    faDragon,
    faFish,
    faFrog,
    faHippo,
    faHorse,
    faOtter,
    faSpider
} from "@fortawesome/free-solid-svg-icons";

const avatarOptions = {
    "OTTER": faOtter,
    "HIPPO": faHippo,
    "DOG": faDog,
    "SPIDER": faSpider,
    "HORSE": faHorse,
    "FROG": faFrog,
    "FISH": faFish,
    "DRAGON": faDragon,
    "CROW": faCrow,
    "CAT": faCat
}

export const getAvatar = (option) => {
    return avatarOptions[option];
}
