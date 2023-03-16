import styles from '@/styles/PostDate.module.scss'


export function PostDate({date, dateOnly}) {
    const dateLang = process.env.NEXT_PUBLIC_WEBSITE_LOCALE;
    const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };
  
    return (
        <small className={styles.postDate}>
            { !dateOnly && 'Posted: '} {new Date(date).toLocaleDateString(dateLang, dateFormat)}
        </small>
    )
}

