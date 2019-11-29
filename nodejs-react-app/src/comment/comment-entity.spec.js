import makeComment from "./comment-entity"
import makeFakeComment from "../../__test__/fixtures/comment"


describe('comment', () => {
it ("must have an author", () => {const comment = makeFakeComment({ author: null })
expect(() => makeComment(comment)).toThrow('Comment must have an author.')})
xit ("must have a valid post id", () => {})
xit ("must have valid text", () => {})
xit ("can be in reply to another comment", () => {})
xit ("can have an id", () => {})
xit ("can create an id", () => {})
xit ("can be published", () => {})
xit ("can be unpublished", () => {})
xit ("is createdOn now in UTC", () => {})
xit ("is modifiedOn now in UTC", () => {})
xit ("sanitizes its text", () => {})
xit ("can be marked deleted", () => {})
xit ("includes a hash", () => {})
xit ("must have a source", () => {})
xit ("must have a source ip", () => {})
xit ("can have a source browser", () => {})
xit ("can have a source referrer", () => {})
})
