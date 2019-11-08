<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output indent="no" omit-xml-declaration="yes" method="text" encoding="UTF-8" media-type="application/json"/>
<xsl:template match = "/icestats" >{<xsl:for-each select="source">
<xsl:if test="string-length(stream_start_iso8601) != 0">
    "<xsl:value-of select="substring(@mount,2)" />": {
        "name" : "<xsl:value-of select="server_name"/>",
        "description" : "<xsl:value-of select="server_description" />",
        "listeners" : "<xsl:value-of select="listeners" />",
        "listeners_peak" : "<xsl:value-of select="listener_peak" />",
        "title" : "<xsl:value-of select="title" />",
        "genre" : "<xsl:value-of select="genre" />"
    }<xsl:if test="position() != last()">,</xsl:if>
    </xsl:if></xsl:for-each>
}</xsl:template>
</xsl:stylesheet>