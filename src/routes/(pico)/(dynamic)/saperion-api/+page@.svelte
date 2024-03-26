<svelte:head>
    <script
            type="text/javascript"
            src="https://unpkg.com/rapidoc@9.3.4/dist/rapidoc-min.js"
    ></script>
</svelte:head>

<rapi-doc
        id="thedoc"
        spec-url="/saperion.json"
        theme="light"
        layout="column"
        render-style="read"
        allow-spec-url-load="false"
        allow-spec-file-load="false"
        allow-server-selection="false"
        allow-search="false"
        bg-color="#f0f3f6"
        nav-bg-color="#e3e8ec"
        nav-text-color="#999"
        nav-hover-bg-color="#fff"
        header-color="#e3e8ec"
        primary-color="#553adf"
        text-color="#4d4d4d"
        regular-font="'Arial', sans-serif"
        mono-font="Inconsolata,Monaco,Consolas,'Courier New',Courier,monospace"
>
    <div slot="header">Saperion API documentation</div>
</rapi-doc>

<style>
    rapi-doc {
        width: 100%;
    }

    img {
        width: 127px;
    }
</style>
