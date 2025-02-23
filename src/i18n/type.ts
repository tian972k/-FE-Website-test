type Bloc1 = {
  cases: {
    category: string;
    cta: string;
    description: string;
    tagline: string;
  }[];
  subtitle: string;
  title: string;
};

type Bloc2 = {
  cases: string[];
  title: string;
};

type Bloc3 = {
  cases: {
    category: string;
    description: string;
    tagline: string;
  }[];
  title: string;
};

type Bloc4 = {
  pictos: {
    description: string;
    title: string;
  }[];
  subtitle: string;
  text: string;
  text_title: string;
  title: string;
};

type Bloc5 = {
  footer: string;
  reviews: {
    author: string;
    date: string;
    review: string;
  }[];
  text: string;
  title: string;
};

type Bloc6 = {
  button: string;
  subtitle: string;
  text: string;
  title: string;
};

type CartePoint = {
  activities: string[];
  address: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  email: string;
  fax: string;
  free_call: string;
  marker_information: string[];
  name: string;
  phone: string;
  website: string;
};

type Footer = {
  address: {
    location: string;
    name: string;
    phone: string;
  };
  links: {
    name: string;
    url: string;
  }[];
};

type PageData = {
  banner_menu: string[];
  banner_title: string[];
  bloc_1: Bloc1;
  bloc_2: Bloc2;
  bloc_3: Bloc3;
  bloc_4: Bloc4;
  bloc_5: Bloc5;
  bloc_6: Bloc6;
  carte_point: CartePoint[];
  footer: Footer;
  head_menu: string[];
  id: string;
  language: string;
};

export type { PageData };
