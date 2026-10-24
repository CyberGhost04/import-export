from pydantic import BaseModel


class ContentLink(BaseModel):
    label: str
    href: str


class ContentStat(BaseModel):
    value: str
    suffix: str = ""
    label: str


class ContentStep(BaseModel):
    title: str
    description: str


class NavigationContent(BaseModel):
    brand_mark: str
    company_name: str
    brand_aria_label: str
    menu_label: str
    nav_aria_label: str
    links: list[ContentLink]
    contact_label: str


class StatusContent(BaseModel):
    loading: str
    loading_detail: str
    unavailable_title: str
    unavailable_description: str
    retry: str


class HeroContent(BaseModel):
    eyebrow: str
    title_line_one: str
    title_line_two: str
    title_emphasis: str
    title_after_emphasis: str
    description: str
    primary_cta: str
    secondary_cta: str
    footnote: str
    image_alt: str
    image_badge: str
    image_caption: str
    slide_number: str
    scroll_label: str
    footer_label: str


class IntroContent(BaseModel):
    kicker_number: str
    kicker: str
    title_line_one: str
    title_line_two: str
    title_emphasis: str
    description: str
    signoff_lines: list[str]
    stats: list[ContentStat]
    closing_note_lines: list[str]


class TradeGalleryContent(BaseModel):
    kicker: str
    title_line_one: str
    title_line_two: str
    title_emphasis: str
    description: str
    card_label: str
    card_action_prefix: str


class PortfolioContent(BaseModel):
    kicker_number: str
    kicker: str
    title_line_one: str
    title_line_two: str
    title_emphasis: str
    description: str
    category_count_label: str
    previous_label: str
    next_label: str
    carousel_aria_label: str
    card_action_prefix: str
    disclaimer: str


class MarketsContent(BaseModel):
    kicker_number: str
    kicker: str
    title_line_one: str
    title_line_two: str
    title_emphasis: str
    description: str
    globe_label: str
    footer_prompt: str
    footer_cta: str


class ApproachContent(BaseModel):
    kicker_number: str
    kicker: str
    title_lines: list[str]
    title_emphasis: str
    description: str
    steps: list[ContentStep]


class FoundersNoteContent(BaseModel):
    kicker_number: str
    kicker: str
    stamp_lines: list[str]
    stamp_caption: str
    brand_mark: str
    quote: str
    body: str


class ContactContent(BaseModel):
    kicker_number: str
    kicker: str
    title_line_one: str
    title_line_two: str
    title_emphasis: str
    description: str
    conversation_label: str
    location_label: str
    cta_label: str
    email_subject: str


class FooterContent(BaseModel):
    brand_mark: str
    company_name: str
    tagline: str


class DetailContent(BaseModel):
    brand_label: str
    brand_mark: str
    category_breadcrumb: str
    insight_breadcrumb: str
    category_not_found_title: str
    category_not_found_description: str
    back_to_categories: str
    back_to_stories: str
    route_kicker_number: str
    route_kicker: str
    route_title_line_one: str
    route_title_line_two: str
    route_title_emphasis: str
    route_description: str
    origin_label: str
    destination_label: str
    logistics_kicker_number: str
    logistics_kicker: str
    logistics_title_line_one: str
    logistics_title_line_two: str
    logistics_title_emphasis: str
    logistics_description: str
    transport_heading: str
    handling_heading: str
    enquiry_kicker_number: str
    enquiry_kicker: str
    enquiry_title_line_one: str
    enquiry_title_line_two: str
    enquiry_title_emphasis: str
    enquiry_title_suffix: str
    discuss_category: str
    insight_not_found_title: str
    insight_not_found_description: str
    insight_route_kicker_number: str
    insight_route_kicker: str
    insight_route_title_line_one: str
    insight_route_title_line_two: str
    insight_route_title_emphasis: str
    insight_route_description: str
    insight_route_label: str
    insight_logistics_kicker_number: str
    insight_logistics_kicker: str
    insight_logistics_title_line_one: str
    insight_logistics_title_line_two: str
    insight_logistics_title_emphasis: str
    insight_logistics_description: str
    insight_transport_heading: str
    insight_handling_heading: str
    insight_enquiry_kicker_number: str
    insight_enquiry_kicker: str
    insight_enquiry_title_line_one: str
    insight_enquiry_title_line_two: str
    insight_enquiry_title_emphasis: str
    explore_categories: str
    photo_placeholder_label: str
    photo_placeholder_aria_prefix: str


class SiteContent(BaseModel):
    site_title: str
    meta_description: str
    navigation: NavigationContent
    hero: HeroContent
    intro: IntroContent
    trade_gallery: TradeGalleryContent
    portfolio: PortfolioContent
    markets: MarketsContent
    approach: ApproachContent
    founders_note: FoundersNoteContent
    contact: ContactContent
    footer: FooterContent
    detail: DetailContent
    status: StatusContent


class TradeRoute(BaseModel):
    direction: str
    origin: str
    destination: str
    market: str


class TradeImage(BaseModel):
    label: str
    image: str | None = None


class TradeInsight(BaseModel):
    id: str
    title: str
    detail: str
    image: str
    alt: str
    overview: str
    origin: str
    destination: str
    transport_modes: list[str]
    handling_notes: list[str]


class TradeCategory(BaseModel):
    id: str
    name: str
    direction: str
    description: str
    products: list[str]
    overview: str
    routes: list[TradeRoute]
    transport_modes: list[str]
    handling_notes: list[str]
    gallery: list[TradeImage]


class TradeMarket(BaseModel):
    id: str
    name: str
    summary: str
    focus: list[str]


class Founder(BaseModel):
    name: str
    title: str


class TradeContact(BaseModel):
    email: str
    secondary_email: str


class TradeData(BaseModel):
    content: SiteContent
    categories: list[TradeCategory]
    trade_insights: list[TradeInsight]
    markets: list[TradeMarket]
    founders: list[Founder]
    contact: TradeContact
