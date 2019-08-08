export default {
    swagger: "2.0",
    info: {
        version: "v1",
        title: "MixrElixr Emotes API",
        description: 
            "---\n" + 
            "API endpoints that power MixrElixr's Custom Emotes.\n\n" + 
            "## Rate Limits\n" +
            "The current endpoint should only need to be called infrequently (ie when initially loading chat) so we've\n" + 
            "implemented a rate limit to enforce this. Please let us know if this does not work for you.\n\n" + 
            "**Global Limit**:\n\n" + 
            "* *Request Count* - 50\n" +
            "* *Time Frame* - 5 mins\n\n" +
            "**Rate Limit Headers**:\n\n" + 
            "* *X-RateLimit-Limit* - set limit\n" +
            "* *X-RateLimit-Remaining* - current usage\n" +
            "* *Retry-After* -  time to wait before retrying after hitting a limit\n\n" + 
            "## Implementing Emotes\n" +
            "When implementing emotes into your tool/app, please adhere to the following:\n" + 
            "#### Emote Codes\n" +
            "An emote code is the text that should trigger the emote.\n" +
            "* Emote codes should be case **sensitive**\n" + 
            "* Emote codes should be preceded by a whitespace character or the beginning of the string and followed by a whitespace character or end of string.\n" +
            "* If punctuation follows directly after an emote code, do not display the emote.\n" +
            "#### Emote Rendering/Sizing\n" +
            "When rendering an emote, keep the following in mind:\n" +
            "* Emotes should render at whatever it's actual resolution is up to a **maximum** set by the \`maxSize\` property on each emote.\n" +
            "* The \`maxSize\` property will always be one of three sizes: *24*, *30*, or *50*. An emote should *never* be bigger than 50x50.\n" + 
            "* If an emotes resolution is less than the defined max size, do **not** scale it to fit the max size.\n" +
            "* Emotes should preferably have left & right margins of **2px**.\n" +
            "* When building the URL for an emote, don't forget use the correct URL template and replace \`{{emoteId}}\` with the id of the emote you want.\n" +
            "* You may need to prefix the URL template with \`https:\` depending on where you are calling from (ie from a desktop app you\n" + 
            "probably need to, but from a hosted webpage you likely don't)",
        contact: {
            name: "@MixrElixr"
        }
    },
    host: "api.mixrelixr.com",
    basePath: "/v1",
    schemes: [
        "https"
    ],
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
    tags: [
        {
            name: "Emote Endpoints"
        }
    ],
    paths: {
        "/emotes/{channelIdOrName}": {
            get: {
                tags: ["Emote Endpoints"],
                description: "Returns all emotes available (both global and channel) for the provided channel as well as url templates for both emote types.",
                produces: [
                    "application/json"
                ],
                parameters: [
                    {
                        name: "channelIdOrName",
                        in: "path",
                        description: "The id or name of the channel to get available emotes for.",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    200: {
                        description: "GetEmotesResponse",
                        schema: {
                            $ref: "#/definitions/GetEmotesResponse"
                        }
                    },
                    404: {
                        description: "Not Found Error",
                        schema: {
                            $ref: "#/definitions/Error"
                        }
                    },
                    429: {
                        description: "Too Many Requests Error",
                        schema: {
                            $ref: "#/definitions/Error"
                        }
                    }
                }
            }
        }
    },
    definitions: {
        GetEmotesResponse: {
            type: "object",
            properties: {
                channelId: {
                    type: "integer"
                },
                channelEmotes: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/ElixrEmote"
                    }
                },
                globalEmotes: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/ElixrEmote"
                    }
                },
                channelEmoteUrlTemplate: {
                    type: "string"
                },
                globalEmoteUrlTemplate: {
                    "type": "string"
                }
            }
        },
        ElixrEmote: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                },
                code: {
                    type: "string"
                },
                maxSize: {
                    type: "integer"
                },
                animated: {
                    type: "boolean"
                }
            }
        },
        Error: {
            type: "object",
            properties: {
                error: {
                    type: "string"
                },
                message: {
                    type: "string"
                },
                status: {
                    type: "integer"
                }
            }
        }
    }
};