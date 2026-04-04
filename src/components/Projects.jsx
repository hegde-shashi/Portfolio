import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {
  FaBrain,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaExternalLinkAlt,
  FaGithub,
  FaImage,
  FaChevronLeft,
  FaChevronRight,
  FaAddressBook,
  FaRocket,
  FaStar
} from 'react-icons/fa'
import projects from '../data/projects.json'

const iconMap = {
  brain: FaBrain,
  database: FaDatabase,
  chart: FaChartLine,
  code: FaCode,
  image: FaImage,
  addressBook: FaAddressBook,
  rocket: FaRocket,
  star: FaStar
}

const resolveImageSource = (image) => {
  if (!image) {
    return ''
  }

  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/') || image.startsWith('data:')) {
    return image
  }

  return `${process.env.PUBLIC_URL}/${image}`
}

const getMediaType = (source = '') => {
  const lower = source.toLowerCase()

  if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg')) {
    return 'video'
  }

  return 'image'
}

const toRawGithubReadmeUrl = (inputUrl) => {
  if (!inputUrl) {
    return ''
  }

  let parsedUrl
  try {
    parsedUrl = new URL(inputUrl)
  } catch {
    return inputUrl
  }

  if (parsedUrl.hostname === 'raw.githubusercontent.com') {
    return inputUrl
  }

  if (parsedUrl.hostname !== 'github.com') {
    return inputUrl
  }

  const segments = parsedUrl.pathname.split('/').filter(Boolean)
  if (segments.length < 2) {
    return inputUrl
  }

  const owner = segments[0]
  const repo = segments[1].replace(/\.git$/i, '')

  if (segments.length >= 5 && (segments[2] === 'blob' || segments[2] === 'raw')) {
    const branch = segments[3]
    const filePath = segments.slice(4).join('/')
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`
  }

  if (segments.length >= 4 && segments[2] === 'tree') {
    const branch = segments[3]
    const dirPath = segments.slice(4).join('/')
    const filePath = dirPath ? `${dirPath}/README.md` : 'README.md'
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`
  }

  return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`
}

const getReadmeUrl = (project) => {
  if (!project) {
    return ''
  }

  if (project.readmeUrl) {
    return toRawGithubReadmeUrl(project.readmeUrl)
  }

  if (!project.fetchReadmeFromGithub || !project.github) {
    return ''
  }

  const match = project.github.match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)(?:[/?#].*)?$/i)
  if (!match) {
    return ''
  }

  const owner = match[1]
  const repo = match[2].replace(/\.git$/i, '')
  const readmePath = project.readmePath || 'README.md'

  return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${readmePath}`
}

const resolveReadmeAssetUrl = (url, readmeUrl) => {
  if (!url) {
    return ''
  }

  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('/')) {
    return url
  }

  if (!readmeUrl) {
    return url
  }

  try {
    return new URL(url, readmeUrl).toString()
  } catch {
    return url
  }
}

const toSlug = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const getNodeText = (node) => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (!node || !node.props) {
    return ''
  }

  const children = React.Children.toArray(node.props.children)
  return children.map(getNodeText).join('')
}

const extractHashFragment = (href, readmeUrl) => {
  if (!href) {
    return ''
  }

  if (href.startsWith('#')) {
    return href
  }

  try {
    const resolvedUrl = readmeUrl ? new URL(href, readmeUrl) : new URL(href)
    return resolvedUrl.hash || ''
  } catch {
    return ''
  }
}

const findAnchorTarget = (container, hashFragment) => {
  if (!container || !hashFragment) {
    return null
  }

  const rawId = decodeURIComponent(hashFragment.replace(/^#/, '')).trim()
  if (!rawId) {
    return null
  }

  const exactMatch = Array.from(container.querySelectorAll('[id]')).find((node) => node.id === rawId)
  if (exactMatch) {
    return exactMatch
  }

  const normalizedTarget = toSlug(rawId)
  return Array.from(container.querySelectorAll('[id]')).find((node) => toSlug(node.id) === normalizedTarget) || null
}

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const readmeCacheRef = useRef({})
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [fetchedReadme, setFetchedReadme] = useState('')
  const [readmeStatus, setReadmeStatus] = useState('idle')
  const [activeReadmeUrl, setActiveReadmeUrl] = useState('')

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth <= 768 ? 1 : 3)
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)

    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const isMobileProjectsView = cardsPerView === 1
  const canPaginate = !isMobileProjectsView && projects.length > cardsPerView
  const maxStartIndex = Math.max(projects.length - cardsPerView, 0)
  const isAtStart = activeIndex === 0
  const isAtEnd = activeIndex >= maxStartIndex

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, maxStartIndex))
  }, [maxStartIndex])

  const visibleProjects = useMemo(() => {
    if (projects.length === 0) {
      return []
    }

    if (isMobileProjectsView) {
      return projects
    }

    return projects.slice(activeIndex, activeIndex + cardsPerView)
  }, [activeIndex, cardsPerView, isMobileProjectsView])

  useEffect(() => {
    if (!selectedProject) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  useEffect(() => {
    if (!selectedProject) {
      setFetchedReadme('')
      setReadmeStatus('idle')
      setActiveReadmeUrl('')
      return undefined
    }

    const readmeUrl = getReadmeUrl(selectedProject)
    setActiveReadmeUrl(readmeUrl)
    if (!readmeUrl) {
      setFetchedReadme('')
      setReadmeStatus('idle')
      return undefined
    }

    const cachedReadme = readmeCacheRef.current[readmeUrl]
    if (cachedReadme) {
      setFetchedReadme(cachedReadme)
      setReadmeStatus('success')
      return undefined
    }

    const controller = new AbortController()
    setReadmeStatus('loading')

    fetch(readmeUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch README (${response.status})`)
        }

        return response.text()
      })
      .then((content) => {
        readmeCacheRef.current[readmeUrl] = content
        setFetchedReadme(content)
        setReadmeStatus('success')
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return
        }

        setReadmeStatus('error')
      })

    return () => controller.abort()
  }, [selectedProject])

  const showPreviousProjects = () => {
    if (!canPaginate || isAtStart) {
      return
    }

    setActiveIndex((currentIndex) => Math.max(currentIndex - cardsPerView, 0))
  }

  const showNextProjects = () => {
    if (!canPaginate || isAtEnd) {
      return
    }

    setActiveIndex((currentIndex) => Math.min(currentIndex + cardsPerView, maxStartIndex))
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="projects-header" ref={ref}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
          >
            Featured Projects
          </motion.h2>
        </div>

        <div className="projects-carousel">
          <motion.button
            type="button"
            className="projects-nav"
            onClick={showPreviousProjects}
            aria-label="Show previous projects"
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.16 }}
            disabled={!canPaginate || isAtStart}
          >
            <FaChevronLeft />
          </motion.button>

          <div className="projects-row">
            <div className={`projects-grid ${isMobileProjectsView ? 'projects-grid-scroll' : ''}`}>
            {visibleProjects.map((project, index) => {
              const IconComponent = iconMap[project.icon] || FaImage
              const imageSource = resolveImageSource(project.image)
              const videoSource = resolveImageSource(project.video)

              return (
                <motion.article
                  key={project.id || project.name}
                  className="project-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.16, delay: 0.03 + index * 0.05 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 24px rgba(0, 0, 0, 0.18)' }}
                >
                  <div className="project-media">
                    {videoSource ? (
                      <video
                        className="project-video-element"
                        src={videoSource}
                        poster={project.poster ? resolveImageSource(project.poster) : undefined}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                      />
                    ) : imageSource ? (
                      <img src={imageSource} alt={project.imageAlt || project.name} className="project-image-element" />
                    ) : (
                      <div className="project-image project-image-fallback">
                        <IconComponent />
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>

                    <div className="project-tech">
                      {project.tools.map((tool, toolIndex) => (
                        <motion.span
                          key={tool}
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{
                            duration: 0.16,
                            delay: index * 0.05 + toolIndex * 0.025,
                          }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>

                    <div className="project-links">
                      <motion.a
                        href={project.github}
                        className="project-link"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{}}
                        whileTap={{}}
                      >
                        <FaGithub />
                        GitHub
                      </motion.a>

                      <motion.button
                        type="button"
                        className="project-link project-link-button"
                        onClick={() => setSelectedProject(project)}
                        whileHover={{}}
                        whileTap={{}}
                      >
                        <FaExternalLinkAlt />
                        View Full
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          </div>

          <motion.button
            type="button"
            className="projects-nav"
            onClick={showNextProjects}
            aria-label="Show next projects"
            initial={{ opacity: 0, x: 8 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ duration: 0.16 }}
            disabled={!canPaginate || isAtEnd}
          >
            <FaChevronRight />
          </motion.button>
        </div>

      </div>

      {selectedProject ? (
        <div className="project-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <motion.div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="project-modal-header">
              <div>
                <p className="project-modal-eyebrow">Project details</p>
                <h3 id="project-modal-title">
                  {selectedProject.name}
                  {selectedProject.github ? (
                    <>
                      <span className="project-modal-title-separator" aria-hidden="true"> | </span>
                      <a
                        className="project-modal-title-link"
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Link
                      </a>
                    </>
                  ) : null}
                </h3>
              </div>

              <button
                type="button"
                className="project-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="project-modal-body markdown-body">
              {readmeStatus === 'loading' ? (
                <p className="project-readme-status">Loading README...</p>
              ) : null}

              {readmeStatus === 'error' ? (
                <p className="project-readme-status">Could not load README from the provided link. Showing local details instead.</p>
              ) : null}

              {selectedProject.detailsMedia?.length ? (
                <div className="project-details-media">
                  {selectedProject.detailsMedia.map((item, mediaIndex) => {
                    const source = resolveImageSource(item.src)
                    const type = item.type || getMediaType(source)

                    if (type === 'video') {
                      return (
                        <figure key={`${selectedProject.id || selectedProject.name}-video-${mediaIndex}`} className="project-details-media-item">
                          <video
                            className="project-details-video"
                            src={source}
                            poster={item.poster ? resolveImageSource(item.poster) : undefined}
                            controls
                            playsInline
                          />
                          {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                        </figure>
                      )
                    }

                    return (
                      <figure key={`${selectedProject.id || selectedProject.name}-image-${mediaIndex}`} className="project-details-media-item">
                        <img className="project-details-image" src={source} alt={item.alt || selectedProject.name} />
                        {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                      </figure>
                    )
                  })}
                </div>
              ) : null}

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ children, ...props }) => {
                    const headingText = React.Children.toArray(children).map(getNodeText).join('')
                    const id = props.id || toSlug(headingText)
                    return <h1 {...props} id={id}>{children}</h1>
                  },
                  h2: ({ children, ...props }) => {
                    const headingText = React.Children.toArray(children).map(getNodeText).join('')
                    const id = props.id || toSlug(headingText)
                    return <h2 {...props} id={id}>{children}</h2>
                  },
                  h3: ({ children, ...props }) => {
                    const headingText = React.Children.toArray(children).map(getNodeText).join('')
                    const id = props.id || toSlug(headingText)
                    return <h3 {...props} id={id}>{children}</h3>
                  },
                  h4: ({ children, ...props }) => {
                    const headingText = React.Children.toArray(children).map(getNodeText).join('')
                    const id = props.id || toSlug(headingText)
                    return <h4 {...props} id={id}>{children}</h4>
                  },
                  h5: ({ children, ...props }) => {
                    const headingText = React.Children.toArray(children).map(getNodeText).join('')
                    const id = props.id || toSlug(headingText)
                    return <h5 {...props} id={id}>{children}</h5>
                  },
                  h6: ({ children, ...props }) => {
                    const headingText = React.Children.toArray(children).map(getNodeText).join('')
                    const id = props.id || toSlug(headingText)
                    return <h6 {...props} id={id}>{children}</h6>
                  },
                  a: (props) => {
                    const href = resolveReadmeAssetUrl(props.href || '', activeReadmeUrl)
                    const lowerHref = href.toLowerCase()
                    const isVideoLink = lowerHref.endsWith('.mp4') || lowerHref.endsWith('.webm') || lowerHref.endsWith('.ogg')
                    const hashFragment = extractHashFragment(props.href || '', activeReadmeUrl)
                    const isHashLink = Boolean(hashFragment)

                    if (isVideoLink) {
                      return <video className="project-details-video" src={href} controls playsInline />
                    }

                    if (isHashLink) {
                      return (
                        <a
                          {...props}
                          href={hashFragment}
                          onClick={(event) => {
                            event.preventDefault()
                            const modalBody = event.currentTarget.closest('.project-modal-body')
                            if (!modalBody) {
                              return
                            }

                            const target = findAnchorTarget(modalBody, hashFragment)
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}
                        >
                          {props.children}
                        </a>
                      )
                    }

                    return (
                      <a {...props} href={href} target="_blank" rel="noreferrer">
                        {props.children}
                      </a>
                    )
                  },
                  img: (props) => (
                    <img
                      {...props}
                      src={resolveReadmeAssetUrl(props.src || '', activeReadmeUrl)}
                      alt={props.alt || selectedProject.name}
                    />
                  ),
                }}
              >
                {fetchedReadme || selectedProject.details || selectedProject.description}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      ) : null}
    </section>
  )
}

export default Projects
