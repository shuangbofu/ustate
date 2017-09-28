<sql id="Example_Where_Clause" >
    <where >
      <foreach collection="oredCriteria" item="criteria" separator="or" >
        <if test="criteria.valid" >
          <trim prefix="(" suffix=")" prefixOverrides="and" >
            <foreach collection="criteria.criteria" item="criterion" >
              <choose >
                <when test="criterion.noValue" >
                  and ${criterion.condition}
                </when>
                <when test="criterion.singleValue" >
                  and ${criterion.condition} #{criterion.value}
                </when>
                <when test="criterion.betweenValue" >
                  and ${criterion.condition} #{criterion.value} and #{criterion.secondValue}
                </when>
                <when test="criterion.listValue" >
                  and ${criterion.condition}
                  <foreach collection="criterion.value" item="listItem" open="(" close=")" separator="," >
                    #{listItem}
                  </foreach>
                </when>
              </choose>
            </foreach>
          </trim>
        </if>
      </foreach>
    </where>
  </sql>
  <sql id="Update_By_Example_Where_Clause" >
    <where >
      <foreach collection="example.oredCriteria" item="criteria" separator="or" >
        <if test="criteria.valid" >
          <trim prefix="(" suffix=")" prefixOverrides="and" >
            <foreach collection="criteria.criteria" item="criterion" >
              <choose >
                <when test="criterion.noValue" >
                  and ${criterion.condition}
                </when>
                <when test="criterion.singleValue" >
                  and ${criterion.condition} #{criterion.value}
                </when>
                <when test="criterion.betweenValue" >
                  and ${criterion.condition} #{criterion.value} and #{criterion.secondValue}
                </when>
                <when test="criterion.listValue" >
                  and ${criterion.condition}
                  <foreach collection="criterion.value" item="listItem" open="(" close=")" separator="," >
                    #{listItem}
                  </foreach>
                </when>
              </choose>
            </foreach>
          </trim>
        </if>
      </foreach>
    </where>
  </sql>
  <sql id="Base_Column_List" >
    profdtl_id, profdtl_birthday, profdtl_address
  </sql>
  <select id="selectByExample" resultMap="BaseResultMap" parameterType="cn.eric.ustate.profiledetail.entity.ProfiledetailExample" >
    select
    <if test="distinct" >
      distinct
    </if>
    <include refid="Base_Column_List" />
    from profiledetail
    <if test="_parameter != null" >
      <include refid="Example_Where_Clause" />
    </if>
    <if test="orderByClause != null" >
      order by ${orderByClause}
    </if>
  </select>
  <select id="selectByPrimaryKey" resultMap="BaseResultMap" parameterType="java.lang.String" >
    select 
    <include refid="Base_Column_List" />
    from profiledetail
    where profdtl_id = #{profdtlId,jdbcType=VARCHAR}
  </select>
  <delete id="deleteByPrimaryKey" parameterType="java.lang.String" >
    delete from profiledetail
    where profdtl_id = #{profdtlId,jdbcType=VARCHAR}
  </delete>
  <delete id="deleteByExample" parameterType="cn.eric.ustate.profiledetail.entity.ProfiledetailExample" >
    delete from profiledetail
    <if test="_parameter != null" >
      <include refid="Example_Where_Clause" />
    </if>
  </delete>
  <insert id="insert" parameterType="cn.eric.ustate.profiledetail.entity.Profiledetail" >
    insert into profiledetail (profdtl_id, profdtl_birthday, profdtl_address
      )
    values (#{profdtlId,jdbcType=VARCHAR}, #{profdtlBirthday,jdbcType=DATE}, #{profdtlAddress,jdbcType=VARCHAR}
      )
  </insert>
  <insert id="insertSelective" parameterType="cn.eric.ustate.profiledetail.entity.Profiledetail" >
    insert into profiledetail
    <trim prefix="(" suffix=")" suffixOverrides="," >
      <if test="profdtlId != null" >
        profdtl_id,
      </if>
      <if test="profdtlBirthday != null" >
        profdtl_birthday,
      </if>
      <if test="profdtlAddress != null" >
        profdtl_address,
      </if>
    </trim>
    <trim prefix="values (" suffix=")" suffixOverrides="," >
      <if test="profdtlId != null" >
        #{profdtlId,jdbcType=VARCHAR},
      </if>
      <if test="profdtlBirthday != null" >
        #{profdtlBirthday,jdbcType=DATE},
      </if>
      <if test="profdtlAddress != null" >
        #{profdtlAddress,jdbcType=VARCHAR},
      </if>
    </trim>
  </insert>
  <select id="countByExample" parameterType="cn.eric.ustate.profiledetail.entity.ProfiledetailExample" resultType="java.lang.Integer" >
    select count(*) from profiledetail
    <if test="_parameter != null" >
      <include refid="Example_Where_Clause" />
    </if>
  </select>
  <update id="updateByExampleSelective" parameterType="map" >
    update profiledetail
    <set >
      <if test="record.profdtlId != null" >
        profdtl_id = #{record.profdtlId,jdbcType=VARCHAR},
      </if>
      <if test="record.profdtlBirthday != null" >
        profdtl_birthday = #{record.profdtlBirthday,jdbcType=DATE},
      </if>
      <if test="record.profdtlAddress != null" >
        profdtl_address = #{record.profdtlAddress,jdbcType=VARCHAR},
      </if>
    </set>
    <if test="_parameter != null" >
      <include refid="Update_By_Example_Where_Clause" />
    </if>
  </update>
  <update id="updateByExample" parameterType="map" >
    update profiledetail
    set profdtl_id = #{record.profdtlId,jdbcType=VARCHAR},
      profdtl_birthday = #{record.profdtlBirthday,jdbcType=DATE},
      profdtl_address = #{record.profdtlAddress,jdbcType=VARCHAR}
    <if test="_parameter != null" >
      <include refid="Update_By_Example_Where_Clause" />
    </if>
  </update>
  <update id="updateByPrimaryKeySelective" parameterType="cn.eric.ustate.profiledetail.entity.Profiledetail" >
    update profiledetail
    <set >
      <if test="profdtlBirthday != null" >
        profdtl_birthday = #{profdtlBirthday,jdbcType=DATE},
      </if>
      <if test="profdtlAddress != null" >
        profdtl_address = #{profdtlAddress,jdbcType=VARCHAR},
      </if>
    </set>
    where profdtl_id = #{profdtlId,jdbcType=VARCHAR}
  </update>
  <update id="updateByPrimaryKey" parameterType="cn.eric.ustate.profiledetail.entity.Profiledetail" >
    update profiledetail
    set profdtl_birthday = #{profdtlBirthday,jdbcType=DATE},
      profdtl_address = #{profdtlAddress,jdbcType=VARCHAR}
    where profdtl_id = #{profdtlId,jdbcType=VARCHAR}
  </update>