// --------------- Page Headers ---------------------------------
/**
 * User listing Header for {@link UserHomePage}
 * @typedef {String} TOURNAMENT_LISTING_HEADER
 */
export const TOURNAMENT_LISTING_HEADER = "Tournament Listing"

// --------------- FORM LABELS ---------------------------------
/**
* Title for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_FORM_TITLE
*/
export const MODAL_ADD_TOURNAMENT_FORM_TITLE = "Add Tournament"
/**
* Name prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_FORM_NAME
*/
export const MODAL_ADD_TOURNAMENT_NAME = "Name"
/**
* Date prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_DATE
*/
export const MODAL_ADD_TOURNAMENT_DATE = "Date"
/**
* Game prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_GAME
*/
export const MODAL_ADD_TOURNAMENT_GAME = "Game Type"
/**
* Type prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_TYPE
*/
export const MODAL_ADD_TOURNAMENT_TYPE = "Tournament Type"
/**
* Status prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_STATUS
*/
export const MODAL_ADD_TOURNAMENT_STATUS = "Status"
/**
* Facebook prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_FACEBOOK
*/
export const MODAL_ADD_TOURNAMENT_FACEBOOK = "Facebook Link"
/**
* Stream prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_STREAM
*/
export const MODAL_ADD_TOURNAMENT_STREAM = "Stream Link"
/**
* Gallery prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_GALLERY
*/
export const MODAL_ADD_TOURNAMENT_GALLERY = "Gallery Link"
/**
* Banner prompt for {@link ModalAddTournamentForm}
* @typedef {String} MODAL_ADD_TOURNAMENT_BANNER
*/
export const MODAL_ADD_TOURNAMENT_BANNER = "Banner URL"

// --------------- FORM OPTIONS ---------------------------------
/**
* Game types for {@link ModalAddTournamentForm}
* @typedef {String[]} MODAL_ADD_TOURNAMENT_GAME_TYPES
*/
export const MODAL_ADD_TOURNAMENT_GAME_TYPES = [{value: "LoL", label: "LoL"}, {value:"FIFA", label: "FIFA"}]
/**
* Tournament types for {@link ModalAddTournamentForm}
* @typedef {String[]} MODAL_ADD_TOURNAMENT_TYPE_TYPES
*/
export const MODAL_ADD_TOURNAMENT_TYPE_TYPES = [{value: "1v1", label: "1v1"}, {value:"teams", label: "Teams"}]
/**
* Status types for {@link ModalAddTournamentForm}
* @typedef {String[]} MODAL_ADD_TOURNAMENT_STATUS_TYPES
*/
export const MODAL_ADD_TOURNAMENT_STATUS_TYPES = [{value: "in progress", label: "In Progress"}, {value:"scheduled", label: "Scheduled"}, {value:"completed", label: "Completed"}]

// --------------- MSGS ---------------------------------
/**
 * 200 response for {@link ModalAddTournamentForm}
 * @typedef {String} MODAL_ADD_TOURNAMENT_200_MESSAGE
 */
export const MODAL_ADD_TOURNAMENT_200_MESSAGE = "Success adding tournament!"
/**
 * 401 response for {@link ModalAddTournamentForm}
 * @typedef {String} MODAL_ADD_TOURNAMENT_401_MESSAGE
 */
export const MODAL_ADD_TOURNAMENT_401_MESSAGE = "Invalid credentials"
/**
 * 500 response for {@link ModalAddTournamentForm}
 * @typedef {String} MODAL_ADD_TOURNAMENT_500_MESSAGE
 */
export const MODAL_ADD_TOURNAMENT_500_MESSAGE = "Oops, something went wrong!"
