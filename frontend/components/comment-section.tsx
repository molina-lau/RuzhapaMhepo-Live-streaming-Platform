import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
} from 'lucide-react';
import { CommentInterface } from '@/types/types';
import { showErrorToast, showSuccessToast } from '@/utils/time-ops';
import { useUserState } from '@/stores/user-state';
import Router, { useRouter } from 'next/router';
import { getCommentsOnline, postCommentOnline } from '@/utils/utils';
export const CommentWidget = ({ comment }: { comment: CommentInterface }) => {
    const commentVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };
    return (
         <motion.div
            variants={commentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Equivalent of <div className="flex items-start gap-4"> */}
            {/* d-flex for display: flex, align-items-start for items-start, gap-3 for gap-4 */}
            <div className="d-flex align-items-start gap-3">
                {/* Equivalent of <div className="flex-shrink-0"> */}
                {/* flex-shrink-0 remains */}
                {/* Added margin-end (me-3) for spacing if gap-3 on parent isn't enough or preferred */}
                <div className="flex-shrink-0 me-3">
                    {/* Equivalent of <User className="w-8 h-8 text-gray-800" /> */}
                    {/* Bootstrap doesn't have w-8 h-8 utilities. text-dark for gray-800. */}
                    {/* Assume User component handles its own size or size via props/CSS. */}
                    <User className="text-dark" />
                </div>
                {/* Equivalent of <div className="flex-1"> */}
                {/* flex-grow-1 for flex-1 */}
                <div className="flex-grow-1">
                    {/* Equivalent of <div className="flex items-center gap-2 mb-1"> */}
                    {/* d-flex for flex, align-items-center for items-center, gap-2 remains, mb-1 remains */}
                    <div className="d-flex align-items-center gap-2 mb-1">
                        {/* Equivalent of <span className="font-semibold text-gray-800"> */}
                        {/* fw-semibold for font-semibold, text-dark for text-gray-800 */}
                        <span className="fw-semibold text-dark">{comment.firstName} {comment.lastName}</span>
                        {/* Equivalent of <span className="text-xs text-gray-400"> */}
                        {/* text-muted for text-gray-400, small tag or class for smaller text */}
                        <span className="text-muted small">
                            {new Date(comment.time * 1000).toLocaleDateString()}
                        </span>
                    </div>
                    <AnimatePresence>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            // Equivalent of className="text-gray-600 leading-relaxed whitespace-pre-wrap"
                            // text-secondary or text-muted for text-gray-600. lh-base is default line height.
                            // whitespace-pre-wrap requires inline style or custom CSS.
                            className="text-secondary" // Or text-muted
                            style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }} // Added line height similar to 'leading-relaxed' and essential white-space
                        >
                            {comment.message}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};
const CommentSection: React.FC = () => {
    const user = useUserState()
    const router = useRouter()
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [comments, setComments] = useState<CommentInterface[]>([])
    const getRadioComments = async () => {
        const result = await getCommentsOnline(router.query.id as string)
        setFetching(true)
        if (typeof result != 'string') {
            setComments(result.comments)
        }
        setFetching(false)
    }
    useEffect(() => {
        getRadioComments()
    }, [router.query])
    const postComment = async () => {
        if (user.email.trim().length === 0) return Router.push("/login")
        if (text.trim().length === 0) return showErrorToast("cant send empty message")
        setLoading(true)
        const response = await postCommentOnline({
            tag: 'radio',
            time: 0,
            idTag: router.query.id as string,
            email: '',
            message: text,
            lastName: '',
            firstName: ''
        })
        setLoading(false)
        if (typeof response === 'string') {
            return showErrorToast(response)
        }
        setText("")
        showSuccessToast(response.message);
        getRadioComments()
    }
    return (
         <div className="container py-4"> {/* Approximate p-6 with Bootstrap padding utility */}
            <div className="row justify-content-center"> {/* max-w-4xl and mx-auto approximated by centering a column within the container */}
                <div className="col-md-10 col-lg-8"> {/* Use col classes to limit width on medium and large screens */}
                    
                    {/* space-y-6 is handled by adding margin-bottom to the input section and margin-top to the comment list container */}
                    <div className="p-4 rounded-3 shadow bg-light mb-4"> {/* New Comment Input: p-6 -> p-4 (approximation), rounded-lg -> rounded-3, shadow-md -> shadow, bg-gray-100 -> bg-light, mb-4 for spacing */}
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write a comment..."
                            className="form-control bg-light" 
                            style={{ minHeight: '100px', resize: 'vertical' }} // min-h-[100px] and resize-y require inline styles or custom CSS in JS object format
                        ></textarea>
                        <button
                            onClick={() => postComment()}
                            className="btn btn-primary mt-4 w-100 d-flex justify-content-center align-items-center"
                        >
                            {/* Replace Tailwind Loader with Bootstrap Spinner */}
                            {loading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                <>Post Comment</>
                            )}
                        </button>
                    </div>

                    {/* Comment List */}
                    <div className='mt-5'> {/* mt-20 -> mt-5 (approximation) */}
                        {fetching ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '6rem' }}> {/* flex justify-center items-center -> d-flex justify-content-center align-items-center, h-24 -> style="height: 6rem;" in JS object format */}
                                {/* Replace Tailwind Loader2 with Bootstrap Spinner */}
                                <div className="spinner-border text-secondary" role="status"> {/* text-gray-400 -> text-secondary */}
                                    <span className="visually-hidden">Loading...</span> {/* For accessibility */}
                                </div>
                            </div>
                        ) : (
                            // AnimatePresence is a React component from a library like Framer Motion, keep it if you are using it.
                            // If not, remove the AnimatePresence tags.
                            // <AnimatePresence> {/* Keep if using Framer Motion */}
                                 comments.map((comment, i) => (
                                     // Assuming CommentWidget renders a block element, add margin-bottom to each for spacing
                                     <div className="mb-4" key={i}> {/* Added mb-4 for spacing between comments. key prop is important in map */}
                                        {/* CommentWidget component goes here. Its internal Tailwind classes would also need conversion to Bootstrap */}
                                        <CommentWidget comment={comment} />
                                     </div>
                                 ))
                            // </AnimatePresence> {/* Keep if using Framer Motion */}
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;

