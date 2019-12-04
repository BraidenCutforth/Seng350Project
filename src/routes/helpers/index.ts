import marked from 'marked'
import { ObjectId } from 'mongodb'
import { Review } from '../../models/review'
import { User, IUser } from '../../models/user'
import { Destination, IDestination } from '../../models/destination'

export interface IHeaderOpts {
    currUser: string
}

interface ReviewInfo {
    title: string
    content: string
    creator: string
    destination: string
}

function getCreator(creators: IUser[], creatorId: ObjectId) {
    const creator = creators.find(creator => creator._id === creatorId)
    return creator ? creator.username : ''
}

function getDestination(destinations: IDestination[], destinationId: ObjectId) {
    const destination = destinations.find(destination => destination._id === destinationId)
    return destination ? destination.name : ''
}

export async function resolveReviewInfo(reviewIds: ObjectId[]): Promise<ReviewInfo[]> {
    try {
        const reviews = await Review.getReviews(reviewIds)
        const creatorIds = reviews.map(review => review.creator_id)
        const creatorsProm = User.getUsers(creatorIds)
        const destinationIds = reviews.map(review => review.destination_id)
        const destinationsProm = Destination.getDestinations(destinationIds)
        const [creators, destinations] = await Promise.all([creatorsProm, destinationsProm])
        return reviews.map(review => {
            return {
                title: review.title,
                content: marked(review.content),
                creator: getCreator(creators, review.creator_id),
                destination: getDestination(destinations, review.destination_id),
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error('Could not get review info')
    }
}
