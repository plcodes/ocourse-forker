<script>
    export default {
        data() {
            return {
                observer: null,
            }
        },
        created() {
            this.observer = new IntersectionObserver(this.onElementObserved, {
                root: this.$el,
                threshold: 0.22,
            })
        },
        mounted() {
            document.querySelectorAll('section[id]').forEach((section) => {
                this.observer.observe(section)
            })
        },
        beforeDestroy() {
            this.observer.disconnect()
        },
        methods: {
            onElementObserved(entries) {
                entries.forEach(({ target, isIntersecting }) => {
                    const id = target.getAttribute('id')
                    if (isIntersecting) {
                        this.$el
                            .querySelector(`nav li a[href="#${id}"]`)
                            .parentElement.classList.add('active')
                    } else {
                        this.$el
                            .querySelector(`nav li a[href="#${id}"]`)
                            .parentElement.classList.remove('active')
                    }
                })
            },
        },
    }
    </script>

<template>
    <nav class="section-nav">
        <ol>
            <li><a href="#courses">{{ $t('Courses.nav') }}</a></li>
            <li><a href="#relay">{{ $t('Relay.nav') }}</a></li>
        </ol>
    </nav>
</template>

<style scoped>
    /* Sticky Navigation */
    .section-nav {
        position: sticky;
        top: 0;
        margin: 0 -30px;
        padding: 10px 30px;
        background-color: var(--color-brand-3);
    }
        
    .section-nav ol {
        display: flex;
        gap: 30px;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .section-nav a {
        text-decoration: none;
        display: inline-block;
        color: var(--color-brand-2);
        transition: all 50ms ease-in-out;
        font-size: 1.5em;
    }
    
    .section-nav a:hover,
    .section-nav a:focus {
        color: #ccc;
    }
    
    .section-nav li.active > a {
        color: var(--color-brand-1);
    }
    
</style>